import { User, UserCreate } from 'types/user';
import { subscribeWithSelector } from 'zustand/middleware';
import { create } from 'zustand';
import { getUsersPerPageLimitSize } from 'utils/userPreferenceStorage';
import { fetch } from 'service/http';
import { useServices, useDashboard } from 'stores';
import { StatisticsQueryKey } from 'components/statistics-card';
import { queryClient } from 'service/react-query';
import { UsersFilterType, FilterUsageType } from 'types/filter';

type UsersStateType = {
  isCreatingNewUser: boolean;
  editingUser: User | null | undefined;
  deletingUser: User | null;
  users: {
    users: User[];
    total: number;
  };
  usersFilters: UsersFilterType;
  resetUsageUser: User | null;
  revokeSubscriptionUser: User | null;
  isResetingAllUsage: boolean;
  subscribeUrl: string | null;
  QRcodeLinks: string[] | null;
  setQRCode: (links: string[] | null) => void;
  setSubLink: (subscribeURL: string | null) => void;
  onResetAllUsage: (isResetingAllUsage: boolean) => void;
  resetAllUsage: () => Promise<void>;
  resetDataUsage: (user: User) => Promise<void>;
  revokeSubscription: (user: User) => Promise<void>;
  onCreateUser: (isOpen: boolean) => void;
  onEditingUser: (user: User | null) => void;
  onDeletingUser: (user: User | null) => void;
  refetchUsers: () => void;
  onFilterChange: (filters: Partial<UsersFilterType>) => void;
  deleteUser: (user: User) => Promise<void>;
  createUser: (user: UserCreate) => Promise<void>;
  editUser: (user: UserCreate) => Promise<void>;
  fetchUserUsage: (user: User, query: FilterUsageType) => Promise<void>;
}

export const fetchUsers = async (query: UsersFilterType): Promise<User[]> => {
  for (const key in query) {
    if (!query[key as keyof UsersFilterType]) delete query[key as keyof UsersFilterType];
  }
  useDashboard.setState({ loading: true });
  return fetch('/users', { query })
    .then((users) => {
      for (let i = 0; i < users.users.length; i++) {
        users.users[i].service = users.users[i].service_ids;
      }
      useUsers.setState({ users });
      return users;
    })
    .finally(() => {
      useDashboard.setState({ loading: false });
    });
};

export const useUsers = create(subscribeWithSelector<UsersStateType>((set, get) => ({
  editingUser: null,
  deletingUser: null,
  isCreatingNewUser: false,
  users: {
    users: [],
    total: 0,
  },
  resetUsageUser: null,
  revokeSubscriptionUser: null,
  isResetingAllUsage: false,
  usersFilters: {
    username: '',
    limit: getUsersPerPageLimitSize(),
    sort: '-created_at',
  },
  QRcodeLinks: null,
  subscribeUrl: null,
  setQRCode: (QRcodeLinks) => {
    set({ QRcodeLinks });
  },
  setSubLink: (subscribeUrl) => {
    set({ subscribeUrl });
  },
  refetchUsers: () => {
    fetchUsers(get().usersFilters);
  },
  resetAllUsage: async () => {
    return fetch('/users/reset', { method: 'POST' }).then(() => {
      get().onResetAllUsage(false);
      get().refetchUsers();
    });
  },
  onResetAllUsage: (isResetingAllUsage) => set({ isResetingAllUsage }),
  onCreateUser: (isCreatingNewUser) => set({ isCreatingNewUser }),
  onEditingUser: (editingUser) => {
    set({ editingUser });
  },
  onDeletingUser: (deletingUser) => {
    set({ deletingUser });
  },
  onFilterChange: (filters) => {
    set({
      usersFilters: {
        ...get().usersFilters,
        ...filters,
      },
    });
    get().refetchUsers();
  },
  deleteUser: async (user: User) => {
    set({ editingUser: null });
    return fetch(`/users/${user.username}`, { method: 'DELETE' }).then(() => {
      set({ deletingUser: null });
      get().refetchUsers();
      queryClient.invalidateQueries(StatisticsQueryKey);
    });
  },
  createUser: async (body: UserCreate) => {
    return fetch('/users', { method: 'POST', body }).then(() => {
      set({ editingUser: null });
      get().refetchUsers();
      useServices.getState().refetchServices();
      queryClient.invalidateQueries(StatisticsQueryKey);
    });
  },
  editUser: async (body: UserCreate) => {
    return fetch(`/users/${body.username}`, { method: 'PUT', body }).then(
      () => {
        get().onEditingUser(null);
        get().refetchUsers();
      }
    );
  },

  fetchUserUsage: (body: User, query: FilterUsageType) => {
    for (const key in query) {
      if (!query[key as keyof FilterUsageType])
        delete query[key as keyof FilterUsageType];
    }
    return fetch(`/users/${body.username}/usage`, { method: 'GET', query });
  },
  resetDataUsage: async (user) => {
    return fetch(`/users/${user.username}/reset`, { method: 'POST' }).then(
      () => {
        set({ resetUsageUser: null });
        get().refetchUsers();
      }
    );
  },
  revokeSubscription: async (user) => {
    return fetch(`/users/${user.username}/revoke_sub`, {
      method: 'POST',
    }).then((user) => {
      set({ revokeSubscriptionUser: null, editingUser: user });
      get().refetchUsers();
    });
  },
})));
