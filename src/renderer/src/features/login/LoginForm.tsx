import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { loginSchema, type LoginFormValues } from './login.schema'
import { useTranslation } from '@/shared/hooks/useTranslation'

export const LoginForm = () => {
  const { trans } = useTranslation('auth')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onChange'
  })

  const onSubmit = (values: LoginFormValues) => {
    console.log(values)
  }

  const isSaveDisabled = isSubmitting || !isValid || !isDirty

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-3xl font-bold">{trans('Login')}</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex w-80 flex-col gap-4 rounded-xl bg-white p-6 shadow"
      >
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">
            {trans('Email')} <span className="ml-0.5 text-red-500">*</span>
          </span>
          <input
            type="email"
            placeholder="you@example.com"
            {...register('email')}
            className={`rounded border p-2 transition-colors ${
              errors.email ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-300'
            }`}
          />
          {errors.email?.message ? (
            <span className="text-xs text-red-600">{trans(errors.email.message)}</span>
          ) : null}
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">
            {trans('Password')} <span className="ml-0.5 text-red-500">*</span>
          </span>
          <input
            type="password"
            placeholder="••••••"
            {...register('password')}
            className={`rounded border p-2 transition-colors ${
              errors.password ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-300'
            }`}
          />
          {errors.password?.message ? (
            <span className="text-xs text-red-600">{trans(errors.password.message)}</span>
          ) : null}
        </label>
        <button
          type="submit"
          disabled={isSaveDisabled}
          className="rounded bg-blue-600 p-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {trans('Login')}
        </button>
      </form>
    </div>
  )
}
