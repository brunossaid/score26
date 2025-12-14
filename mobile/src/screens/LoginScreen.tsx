import { View, Text, Image, StyleSheet } from 'react-native';
import { Button, SegmentedButtons, TextInput } from 'react-native-paper';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as authApi from '../api/auth';
import { saveAuth } from '../storage/auth.storage';
import { useAuth } from '../context/AuthContext';

import {
  loginSchema,
  registerSchema,
  type AuthForm,
} from '../schemas/auth.schemas';

type AuthMode = 'login' | 'register';

export default function LoginScreen() {
  const [mode, setMode] = useState<AuthMode>('login');
  const { login } = useAuth();

  const schema = useMemo(
    () => (mode === 'login' ? loginSchema : registerSchema),
    [mode]
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AuthForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      confirmPassword: '',
    },
    mode: 'onTouched',
  });

  const onChangeMode = (value: string) => {
    setMode(value as AuthMode);
    reset({
      email: '',
      password: '',
      name: '',
      confirmPassword: '',
    });
  };

  const onSubmit = async (data: AuthForm) => {
    try {
      if (mode === 'login') {
        const res = await authApi.login({
          email: data.email,
          password: data.password,
        });
        await saveAuth(res.token, res.user);
        login();
        console.log('LOGIN OK', res);
        return;
      }

      const res = await authApi.register({
        email: data.email,
        name: data.name ?? '',
        password: data.password,
      });
      console.log('REGISTER OK', res);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'Request failed';
      alert(msg);
      console.log('AUTH ERROR', err?.response?.data || err);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/score.png')} style={styles.image} />
      <Text style={styles.title}>score26</Text>

      <SegmentedButtons
        value={mode}
        onValueChange={onChangeMode}
        buttons={[
          { value: 'login', label: 'Login' },
          { value: 'register', label: 'Register' },
        ]}
        style={styles.mode}
      />

      <View style={styles.form}>
        {/* email */}
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              label="Email"
              mode="outlined"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.input}
              error={!!errors.email}
            />
          )}
        />
        {errors.email?.message && (
          <Text style={styles.errorText}>{String(errors.email.message)}</Text>
        )}

        {/* name (register) */}
        {mode === 'register' && (
          <>
            <Controller
              control={control}
              name="name"
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  label="Name"
                  mode="outlined"
                  value={value ?? ''}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  style={styles.input}
                  error={!!errors.name}
                />
              )}
            />
            {errors.name?.message && (
              <Text style={styles.errorText}>
                {String(errors.name.message)}
              </Text>
            )}
          </>
        )}

        {/* password */}
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              label="Password"
              mode="outlined"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry
              style={styles.input}
              error={!!errors.password}
            />
          )}
        />
        {errors.password?.message && (
          <Text style={styles.errorText}>
            {String(errors.password.message)}
          </Text>
        )}

        {/* confirm password (register) */}
        {mode === 'register' && (
          <>
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  label="Confirm Password"
                  mode="outlined"
                  value={value ?? ''}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry
                  style={styles.input}
                  error={!!errors.confirmPassword}
                />
              )}
            />
            {errors.confirmPassword?.message && (
              <Text style={styles.errorText}>
                {String(errors.confirmPassword.message)}
              </Text>
            )}
          </>
        )}

        {mode === 'login' && (
          <Text style={styles.changeText}>Forgot Password?</Text>
        )}

        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
          disabled={isSubmitting}
          style={styles.button}
        >
          {mode === 'login' ? 'Sign in' : 'Sign up'}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  title: { fontSize: 40, fontWeight: 'bold', color: '#fff' },
  image: { width: 200, height: 200, resizeMode: 'contain', marginBottom: 10 },
  mode: { width: 300, marginTop: 20 },
  form: { marginTop: 20, width: 300 },
  input: { marginBottom: 12 },
  changeText: { color: '#00FFCC', textAlign: 'right', marginBottom: 6 },
  button: { marginTop: 6, padding: 4 },
  errorText: { color: '#ff6b6b', marginTop: -8, marginBottom: 8 },
});
