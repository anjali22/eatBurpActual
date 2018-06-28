export const UI_START_LOADING = "UI_START_LOADING";
export const UI_STOP_LOADING = "UI_STOP_LOADING";

export const uiStartLoading = () => {
    return{
        type: UI_START_LOADING
    };
};

export const uiStopLoading = () => {
    return {
        type: UI_STOP_LOADING
    };
};