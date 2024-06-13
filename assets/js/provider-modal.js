function onSendWhatsappDeveloper() {
    let providerName = $("#providerName").val();
    if (!providerName) {
        showErrorToast("يرجى ادخال الاسم");
        return;
    }

    let whatsappMessage = `مرحبا ${providerName},\n`;
    whatsappMessage += `شكرًا لتواصلك لإنشاء موقع لمشروعك. نحن متحمسون للعمل معك وتحقيق رؤيتك. سنبذل قصارى جهدنا لضمان تجربة موقع متميزة تلبي احتياجاتك وتفوق توقعاتك\n\n`;
    whatsappMessage += `سيتم التواصل معك فى اقرب وقت \n`;
    whatsappMessage += `أطيب التحيات. \n`;

    let encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://api.whatsapp.com/send?phone=+201211822062&text=${encodedMessage}`, '_blank');
}