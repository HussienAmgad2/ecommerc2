import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom"; // استخدام useNavigate بدلاً من useHistory

export default function Order() {
  const [animationData, setAnimationData] = useState(null);
  const navigate = useNavigate(); // تهيئة useNavigate

  useEffect(() => {
    import("./1.json")
      .then((data) => {
        setAnimationData(data.default || data); // تحقق من هيكل البيانات
      })
      .catch((error) => {
        console.error("Error loading animation data:", error); // عرض الأخطاء في حالة فشل التحميل
      });
  }, []);

  const handleAnimationComplete = () => {
    window.location.href = '/home';
  };

  const defaultOptions = {
    loop: false, // تغيير إلى false إذا كنت لا ترغب في تكرار الرسوم المتحركة
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  if (!animationData) return <div>Loading...</div>; // عرض تحميل مؤقت

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Lottie
        options={defaultOptions}
        height={400}
        width={400}
        eventListeners={[
          {
            eventName: 'complete',
            callback: handleAnimationComplete, // الانتقال عند انتهاء الرسوم المتحركة
          },
        ]}
      />
    </div>
  );
}