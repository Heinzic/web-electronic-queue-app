import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setUserInfo } from '@/store/slices/userSlice';

const formSchema = z.object({
  lastName: z.string().min(1, 'Фамилия обязательна'),
  firstName: z.string().min(1, 'Имя обязательно'),
  middleName: z.string().optional(),
  email: z.string().email('Неверный формат email'),
  phone: z.string()
    .regex(/^[0-9]+$/, 'Телефон должен содержать только цифры')
    .min(10, 'Телефон должен содержать не менее 10 цифр')
    .max(15, 'Телефон должен содержать не более 15 цифр'),
  comment: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function UserInfoForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const storedUserInfo = useAppSelector((state) => state.userSlice.userInfo);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: storedUserInfo || {
      lastName: '',
      firstName: '',
      middleName: '',
      email: '',
      phone: '',
      comment: '',
    },
  });


  function onSubmit(values: FormValues) {
    dispatch(setUserInfo(values));
    navigate('/confirm');
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Фамилия" {...field} className='bg-white'/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Имя" {...field} className='bg-white'/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="middleName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Отчество" {...field} className='bg-white'/>
              </FormControl>
              <FormDescription>Это поле не обязательно</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Электронная почта" {...field} className='bg-white'/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Телефон" {...field} className='bg-white'/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Комментарий" {...field} className='bg-white'/>
              </FormControl>
              <FormDescription>Это поле не обязательно</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-[15px]">
            <NavLink to={'/'}><Button type="reset" variant={'destructive'}>Назад</Button></NavLink>
            <Button type="submit">Продолжить</Button>
        </div>
        
      </form>
    </Form>
  );
}