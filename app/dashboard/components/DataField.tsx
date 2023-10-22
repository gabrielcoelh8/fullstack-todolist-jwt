import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const tomorrow = dayjs().add(1, 'day');

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

interface DataFieldProps {
    label: string,
    dateValue: Date
    setSelectedDate: (newDate: Date) => void
}

const DateFieldValue: React.FC<DataFieldProps> = ({ label, dateValue, setSelectedDate }) => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs(dateValue));

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  return (
    <ThemeProvider theme={darkTheme}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateField']}>
        <DateField
          label={label}
          value={value}
          timezone="system"
          onChange={handleDateChange}
          minDate={tomorrow}
          format="DD/MM/YYYY"
        />
      </DemoContainer>
    </LocalizationProvider>
    </ThemeProvider>
  );
}

export default DateFieldValue
