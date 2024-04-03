import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  ToggleGroup,
  ToggleGroupItem,
  ScrollArea
} from '@marzneshin/components';
import { useServicesQuery } from '@marzneshin/features/services';
import { ServiceCard, UserMutationType } from '@marzneshin/features/users';
import { FC } from 'react'
import { useTranslation } from 'react-i18next';

interface ServicesFieldProps {
  services: string[]
  setServices: (s: string[]) => void
}

export const ServicesField: FC<ServicesFieldProps> = (
  { form, services, setServices }
) => {
  const form = useFormContext()
  const { data } = useServicesQuery()
  const { t } = useTranslation()
  return (
    <FormField
      control={form.control}
      name="services"
      render={() => (
        <FormItem>
          <FormLabel>{t('services')}</FormLabel>
          <FormControl>
            <ToggleGroup
              defaultValue={services}
              className="h-full"
              onValueChange={setServices}
              type="multiple"
            >
              <ScrollArea className="flex flex-col justify-start h-full">
                {...data.map((service) => {
                  return (
                    <ToggleGroupItem value={String(service.id)} key={service.id} className="px-0 mb-1 w-full">
                      <ServiceCard service={service} />
                    </ToggleGroupItem>
                  )
                })}
              </ScrollArea>
            </ToggleGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
