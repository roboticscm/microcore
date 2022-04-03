export const getFileExtension = (fileName) => {
    if (!fileName) {
        throw new Error('SYS.MSG.INVALID_FILE_NAME');
    }

    const index = fileName.lastIndexOf('.');
    if (index < 0) {
        throw new Error('SYS.MSG.INVALID_FILE_NAME')
    }

    return fileName.substring(index + 1);
}

export const getFileExt = (fileName) => {
    if (!fileName) {
        return '';
    }

    const index = fileName.lastIndexOf('.');
    if (index < 0) {
        return '';
    }

    return fileName.substring(index + 1);
}

export const contentTypeBase64Header = (contentType, base64Data = '') => {
    return `data:${contentType};base64,${base64Data}`;
}

export const downloadBase64 = (base64Data, fileName = '') => {
    const link = document.createElement('a');
    link.href = base64Data;
    link.download = fileName;
    link.click();
};