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
const showAlert = (msg = '') => {
    const toast = window.Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        padding: '2em',
    });
    toast.fire({
        icon: 'success',
        title: msg,
        padding: '2em',
    });
};

const useShowMessage = () => {
    return { showMessage, showAlert }
}

export default useShowMessage
