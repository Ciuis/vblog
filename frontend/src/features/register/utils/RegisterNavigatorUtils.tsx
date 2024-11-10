import { ClearRounded, ArrowBackRounded } from '@mui/icons-material'

export const displayIcon = (step: number):JSX.Element => {
    switch (step) {
        case 1:
            return <ClearRounded sx={{fontSize: 25}} />
        case 2:
            return <ArrowBackRounded sx={{fontSize: 25}} />
        case 3:
            return <ArrowBackRounded sx={{fontSize: 25}} />
        case 4:
            return <></>
        case 5:
            return <ArrowBackRounded sx={{fontSize: 25}} />
        case 6:
            return <></>
        default:
            return <></>
    }
}

export const stepBtnVisibility = (step: number): string => {
    if (step === 4 || step >= 6) {
        return "reg-nav-btn-disabled"
    }

    return "reg-nav-btn"
}