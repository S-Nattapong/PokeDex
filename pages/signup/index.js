import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import { useForm } from "react-hook-form";
import "tailwindcss/tailwind.css";
import Navbar from "../../components/Navbar";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";       
import localizedFormat from "dayjs/plugin/localizedFormat";  
import utc from "dayjs/plugin/utc";

const steps = [
  "ลงทะเบียน email และ password",
  "ลงทะเบียนชื่อนามสกุล",
  "ลงทะเบียนเรียบร้อย",
];


dayjs.extend(buddhistEra);
dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.locale("th");



export default function SignUp() {
  const [activeStep, setActiveStep] = useState(0);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
    setError,
    trigger,
    watch,
    getValues,
  } = useForm({
    defaultValues: {
      password: null,
      email: null,
      confirmPassword: null,
      birthDate: null,
    },
  });

  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [age, setAge] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const clearErrors = (fieldName) => {
    setError(fieldName, undefined);
  };
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);



  const setErrorState = (error) => {
    setHasError(true);
    setErrorMessage(error);
  };

  const password = watch("password", "");

const onSubmit = (data) => {
  console.log("onSubmit");
  if (activeStep === 0) {
    if (!errors.email && !errors.password && !errors.confirmPassword) {
      setActiveStep(1);
    } else {
      // Handle errors
    }
  } else if (activeStep === 1) {
    if (!errors.firstName && !errors.lastName && !errors.birthDate) {
      setActiveStep(2);
    } else {
      // Handle errors
    }
  }
};


  const onError = (data) => {
    console.log("onError");
  };

const handleDateChange = (date) => {
  setSelectedDate(date);

  if (date) {
    const currentDate = dayjs();
    const birthDate = dayjs(date).locale("th").format("DD/MM/YYYY");
    const diffInYears = currentDate.diff(birthDate, "year");
    setAge(diffInYears);

    if (diffInYears <= 5 ) {
      setIsNextButtonDisabled(true);
    } else {
      setIsNextButtonDisabled(false);
    }
  } else {
    setAge(null);
    setIsNextButtonDisabled(false);
  }
};

  

  return (
    <Box>
      <Navbar />
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          backgroundColor: "white",
        }}
      >
        <Box sx={{ width: "70%", marginTop: "3rem", marginLeft: "0.5rem" }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Card
          variant="outlined"
          sx={{
            width: "100%",
            maxWidth: "400px",
            height: "650px",
            borderColor: "##AEAEAE",
            marginTop: "3rem",
          }}
        >
          <CardContent>
            <Box className="flex items-center mb-4">
              <img
                src="/images/pokeball.png"
                alt="Pokemon Card Deck"
                className="mb-4"
                style={{ width: "20%", height: "auto" }}
              />
              <h3>สร้างบัญชี Pokemon Card Deck</h3>
            </Box>
            {activeStep === 0 && (
              <form onSubmit={handleSubmit(onSubmit, onError)}>
                <TextField
                  label="ที่อยู่อีเมล"
                  variant="outlined"
                  className="mb-4"
                  sx={{
                    width: "100%",
                    height: "auto",
                    marginBottom: "0.5rem",
                  }}
                  {...register("email", {
                    required: "กรุณากรอกที่อยู่อีเมล",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "ที่อยู่อีเมลไม่ถูกต้อง",
                    },
                  })}
                  error={Boolean(errors.email)}
                  helperText={errors.email && errors.email.message}
                />
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <TextField
                    label="รหัสผ่าน"
                    variant="outlined"
                    type="password"
                    className="mb-4"
                    sx={{
                      width: "49%",
                      height: "auto",
                    }}
                    {...register("password", {
                      required: "กรุณากรอกรหัสผ่าน",
                      minLength: {
                        value: 8,
                        message: "ต้องมีอย่างน้อย 8 ตัวอักษร",
                      },
                    })}
                    error={Boolean(errors.password)}
                    helperText={errors.password && errors.password.message}
                  />
                  <TextField
                    label="ยืนยันรหัสผ่าน"
                    variant="outlined"
                    type="password"
                    className="mb-4"
                    sx={{ width: "49%", height: "auto" }}
                    {...register("confirmPassword", {
                      required: "กรุณากรอกยืนยันรหัส",
                      validate: (value) =>
                        value === password || "รหัสผ่านไม่ตรงกัน",
                    })}
                    error={Boolean(errors.confirmPassword)}
                    helperText={
                      errors.confirmPassword && errors.confirmPassword.message
                    }
                  />
                </Box>
                
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  sx={{ width: "100%", marginTop: "0.5rem" }}
                  className="mb-4"
                >
                  {hasError ? (
                    <Typography variant="body2" color="error" gutterBottom>
                      {errorMessage}
                    </Typography>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      className="mb-4"
                      sx={{ width: "20%", height: "auto" }}
                      type="submit"
                    >
                      ต่อไป
                    </Button>
                  )}
                </Box>
              </form>
            )}

            {activeStep === 1 && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  label="ชื่อ"
                  variant="outlined"
                  className="mb-4"
                  sx={{
                    width: "100%",
                    height: "auto",
                    marginBottom: "1rem",
                  }}
                  {...register("firstName", {
                    required: "กรุณากรอกชื่อ",
                  })}
                  error={Boolean(errors.firstName)}
                  helperText={errors.firstName && errors.firstName.message}
                />
                <TextField
                  label="นามสกุล"
                  variant="outlined"
                  className="mb-4"
                  sx={{
                    width: "100%",
                    height: "auto",
                    marginBottom: "1rem",
                  }}
                  {...register("lastName", {
                    required: "กรุณากรอกนามสกุล",
                  })}
                  error={Boolean(errors.lastName)}
                  helperText={errors.lastName && errors.lastName.message}
                />
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="th"
                >
                  <Controller
                    control={control}
                    name="birthDate"
                    defaultValue={null}
                    rules={{
                      required: "กรุณาเลือกวันเกิด",
                      validate: {
                        notEmpty: (value) =>
                          value !== null || "กรุณาเลือกวันเกิด",
                      },
                    }}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        label="วันเกิด"
                        inputFormat="DD/MM/BBBB"
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={Boolean(errors.birthDate)}
                            helperText={errors.birthDate?.message}
                          />
                        )}
                        onChange={(value) => {
                          field.onChange(value);
                          handleDateChange(value);
                        }}
                        disableFuture // Disable selecting dates after the current date
                      />
                    )}
                  />
                  <Typography variant="subtitle1" className="mb-2">
                    อายุ: {age}
                  </Typography>
                </LocalizationProvider>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  sx={{ width: "100%", marginTop: "1rem" }}
                  className="mb-4"
                >
                  <Button
                    variant="contained"
                    color="primary"
                    className="mb-4"
                    sx={{ width: "30%", height: "50px" }}
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    ย้อนกลับ
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className="mb-4"
                    sx={{ width: "30%", height: "auto" }}
                    type="submit"
                    disabled={isNextButtonDisabled}
                  >
                    ต่อไป
                  </Button>
                </Box>
              </form>
            )}

            {activeStep === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  ข้อมูลการลงทะเบียนสำเร็จแล้ว
                </Typography>
                <Typography variant="body1" gutterBottom>
                  ขอบคุณที่ลงทะเบียนเข้าร่วม Pokemon Card Deck
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
             
