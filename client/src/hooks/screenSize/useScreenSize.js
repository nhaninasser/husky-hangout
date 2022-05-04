import useMediaQuery from '@mui/material/useMediaQuery';
export default function useScreenSize () {
    const isDesktop = useMediaQuery("(min-width: 600px)")
return {
    isDesktop
}
}