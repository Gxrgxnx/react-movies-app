import React from 'react';
import { TextField } from '@mui/material';
import { useTheme } from '../context/ThemeContext';
import { appTheme } from '../styles/theme';

interface InputFieldProps {
  type: string;
  label: string;
  placeholder: string;
  helperText?: string;
  hasError?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField = ({ 
  type,
  label,
  placeholder,
  helperText,
  hasError,
  value,
  onChange
}: InputFieldProps) => {
  const { toggledLightMode } = useTheme();
  const theme = toggledLightMode ? appTheme.light : appTheme.dark;

  return (
    <TextField 
      type={type}
      label={label} 
      placeholder={placeholder} 
      helperText={helperText}
      value={value}
      onChange={onChange}
      sx={{
        marginBottom: '1rem',
        '& label.Mui-focused': {
          color: hasError ? theme.error : theme.primary,
          fontSize: "large",
          fontFamily: 'Gill Sans'
        },
        '& label': {
          color: hasError ? theme.error : theme.primary,
          fontFamily: 'Gill Sans'
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: hasError ? theme.error : theme.interactive,
          },
          '&:hover fieldset': {
            borderColor: hasError ? theme.error : theme.primary,
          },
          '&.Mui-focused fieldset': {
            borderColor: hasError ? theme.error : theme.primary,
            borderWidth: "1.5px",
          },
        },
        '& input': {
          color: hasError ? theme.error : theme.primary, 
          fontFamily: 'Gill Sans',
        },
        '& .MuiFormHelperText-root': {
          color: hasError ? theme.error : theme.primary,
        },
      }}
    />
  );
};
