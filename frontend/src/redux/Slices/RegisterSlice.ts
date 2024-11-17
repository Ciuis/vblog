import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";


import { BirthDate } from "../../utils/GlobalInterfaces";

interface RegisterSliceState {
    loading: boolean;
    error: boolean;
    firstName: string;
    isValidFirstName: boolean;
    lastName: string;
    isValidLastName: boolean;
    email: string;
    isValidEmail: boolean;
    birthDate: BirthDate;
    isValidBirthDate: boolean;
    step: number;
    username: string;
    phone: string;
    isValidPhone: boolean;
    code: string;
    password: string;
    login: boolean;
}

interface UpdatePayload {
    name: string;
    value: string | number | boolean;
}

interface RegisterUser {
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string;
}

interface UpdatePhone {
    username: string;
    phone: string
}

interface VerifyCode {
    username: string;
    code: string;
}

interface UpdatePassword {
    username: string;
    password: string;
}

const initialState: RegisterSliceState = {
    loading: false,
    error: false,
    firstName: '',
    isValidFirstName: false,
    lastName: '',
    isValidLastName: false,
    email: '',
    isValidEmail: false,
    birthDate: {
        month: 0,
        day: 0,
        year: 0
    },
    isValidBirthDate: false,
    step: 1,
    username: "",
    phone: "",
    isValidPhone: false,
    code: "",
    password: "",
    login: false
}

export const registerUser = createAsyncThunk(
    'register/register',
    async(user:RegisterUser, thunkAPI) => {
        try {
            const request = await axios.post('http://localhost:8000/auth/register', user);
            return await request.data;
        } catch(e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
)

export const updatePhone = createAsyncThunk(
    'register/phone',
    async (body:UpdatePhone, thunkAPI) => {
        try {
            const request = await axios.put('http://localhost:8000/auth/update/phone', body);
            const email = await axios.post('http://localhost:8000/auth/email/verification', {username:body.username});
        } catch(e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
)

export const resendEmail = createAsyncThunk(
    'register/resend',
    async (username:string, thunkAPI) => {
        try {
            const request = await axios.post('http://localhost:8000/auth/email/verification', {username});
        } catch(e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
)

export const verifyEmail = createAsyncThunk(
    'register/verify',
    async (body:VerifyCode, thunkAPI) => {
        try {
            const request = await axios.post('http://localhost:8000/auth/email/verify', body);
            return request;
        } catch(e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
)

export const updatePassword = createAsyncThunk(
    'register/password',
    async (body:UpdatePassword, thunkAPI) => {
        try {
            const request = await axios.put('http://localhost:8000/auth/update/password', body);
        } catch(e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
)

export const RegisterSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        updateRegister(state, action:PayloadAction<UpdatePayload>) {
            let {name, value} =  action.payload;

            if (name === 'month' || name === 'day' || name === 'year') {
                let birthDate = state.birthDate;

                birthDate = {
                    ...birthDate,
                    [name]: value
                };

                state = {
                    ...state,
                    birthDate
                };
            } else {
                state = {
                    ...state,
                    [name]: value
                }
            }

            console.log('Updating the global register state: ', state);

            return state;
        },

        stepForward(state) {
            state.step++;
            state.error = false;
            return state;
        },

        stepBackward(state) {
            if (state.step === 1 || state.step === 4 || state.step >= 6) return state;
            else {
                state.step--;
                return state;
            } 
        }
    },

    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state, action) => {
            state.loading = true;
            return state;
        });

        builder.addCase(updatePhone.pending, (state, action) => {
            state = {
                ...state,
                loading: true
            }

            return state;
        });

        builder.addCase(resendEmail.pending, (state, action) => {
            state = {
                ...state,
                loading: true
            }

            return state;
        });

        builder.addCase(verifyEmail.pending, (state, action) => {
            state = {
                ...state,
                loading: true
            }

            return state;
        });

        builder.addCase(updatePassword.pending, (state, action) => {
            state = {
                ...state,
                loading: true
            }

            return state;
        });

        builder.addCase(registerUser.fulfilled, (state, action) => {
            let nextStep = state.step + 1;
            state = {
                ...state,
                username: action.payload.username,
                loading: false,
                error: false,
                step: nextStep
            }

            return state;
        });

        builder.addCase(updatePhone.fulfilled, (state, action) => {
            let nextStep = state.step + 1;
            state = {
                ...state,
                loading: false,
                error: false,
                step: nextStep
            }

            return state;
        });

        builder.addCase(resendEmail.fulfilled, (state, action) => {
            state = {
                ...state,
                loading: false,
                error: false
            }

            return state;
        });

        builder.addCase(verifyEmail.fulfilled, (state, action) => {
            let nextStep = state.step + 1;
            state = {
                ...state,
                loading: false,
                error: false,
                step: nextStep
            }

            return state;
        });

        builder.addCase(updatePassword.fulfilled, (state, action) => {
            state = {
                ...state,
                loading: false,
                error: false,
                login: true
            }

            return state;
        });

        builder.addCase(registerUser.rejected, (state, action) => {
            state.error = true;
            state.loading = false;
            return state;
        });

        builder.addCase(updatePhone.rejected, (state, action) => {
            state = {
                ...state,
                loading: false,
                error: true
            }

            return state;
        });

        builder.addCase(resendEmail.rejected, (state, action) => {
            state = {
                ...state,
                loading: false,
                error: true
            }

            return state;
        });

        builder.addCase(verifyEmail.rejected, (state, action) => {
            state = {
                ...state,
                loading: false,
                error: true
            }

            return state;
        });

        builder.addCase(updatePassword.rejected, (state, action) => {
            state = {
                ...state,
                loading: false,
                error: true
            }

            return state;
        });
    }
});

export const {updateRegister, stepForward, stepBackward} = RegisterSlice.actions;

export default RegisterSlice.reducer;