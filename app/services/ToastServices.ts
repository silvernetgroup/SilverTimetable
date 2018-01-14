declare let window: any;

export default class ToastServices {

    public static show(message: string) {
        window.plugins.toast.showWithOptions({
            message,
            duration: 3000,
            position: "bottom",
            styling: this.toastStyle,
        });
    }

    private static toastStyle = {
        opacity: 1,
        backgroundColor: "#31429D",
        textColor: "white",
        cornerRadius: 100,
        textSize: 16,
        horizontalPadding: 55,
        verticalPadding: 33,
        marginBottom: 6,
    };
}
