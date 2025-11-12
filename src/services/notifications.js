// src/services/notifications.js
export const sendNotifications = async (projectData) => {
  try {
    await sendConfirmationEmail(projectData);
    await sendWhatsAppNotification(projectData);
    await notifyDesigner(projectData);
    return { success: true };
  } catch (error) {
    console.error('خطأ في الإشعارات:', error);
    return { success: false, error };
  }
};

const sendConfirmationEmail = async (data) => {
  const emailData = {
    to: data.email,
    subject: 'تأكيد الطلب - خدمات التصميم',
    template: 'order-confirmation',
    data: {
      name: data.name,
      projectName: data.projectName,
      orderId: Date.now()
    }
  };
  
  console.log('إرسال بريد إلكتروني:', emailData);
  return Promise.resolve();
};

const sendWhatsAppNotification = async (data) => {
  const message = `تم استلام طلبك وهو قيد المراجعة حالياً. سنتواصل معك قريباً.\n\nتفاصيل الطلب:\nالمشروع: ${data.projectName}\nرقم الطلب: ${Date.now()}\n\nرد بـ:\n١. تتبع حالة الطلب\n٢. التواصل مع المصمم\n٣. التواصل مع المسوق`;
  
  console.log('إرسال واتساب إلى:', data.mobile, 'الرسالة:', message);
  return Promise.resolve();
};

const notifyDesigner = async (data) => {
  const designerMessage = `تم تعيين مشروع جديد:\nالعميل: ${data.name}\nالمشروع: ${data.projectName}\nالاتصال: ${data.mobile}`;
  
  console.log('إشعار المصمم:', designerMessage);
  return Promise.resolve();
};

export const processPayment = async (data) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      success: true,
      paymentId: 'pay_' + Math.random().toString(36).substr(2, 9),
      amount: 299.00
    };
  } catch (error) {
    throw new Error('فشل معالجة الدفع');
  }
};