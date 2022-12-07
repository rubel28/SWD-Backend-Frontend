const showMessage = (msg = '', type = '') => {
    const toast = window.Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
    });
    toast.fire({
        icon: type,
        title: msg,
        padding: '10px 20px',
    });
};
const showArrayMessage = (msg = [], type = '') => {
    let eMessage = '';
    //console.log(eMessage);
    Object.values(msg).forEach((value) => {
        eMessage += value + "\n";
    });
    const toast = window.Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
    });
    toast.fire({
        icon: type,
        title: eMessage,
        padding: '10px 20px',
    });
};
const showAlert = (msg = '', type = '') => {
    const toast = window.Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        padding: '2em',
    });
    toast.fire({
        icon: type,
        title: msg,
        padding: '2em',
    });
};

const useShowMessage = () => {
    return { showMessage, showAlert,showArrayMessage }
}

export default useShowMessage
