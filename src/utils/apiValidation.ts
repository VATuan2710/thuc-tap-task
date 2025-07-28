// API Configuration Validation
export const validateApiConfig = () => {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const baseUrl = import.meta.env.VITE_OPENWEATHER_BASE_URL;

  const errors: string[] = [];

  if (!apiKey) {
    errors.push('VITE_OPENWEATHER_API_KEY không được tìm thấy trong file .env');
  } else if (apiKey === 'your_api_key_here') {
    errors.push('API key chưa được cấu hình. Vui lòng thay thế "your_api_key_here" bằng API key thật');
  } else if (apiKey.length < 10) {
    errors.push('API key có vẻ không hợp lệ (quá ngắn)');
  }

  if (!baseUrl) {
    errors.push('VITE_OPENWEATHER_BASE_URL không được tìm thấy');
  }

  return {
    isValid: errors.length === 0,
    errors,
    config: {
      apiKey: apiKey || '',
      baseUrl: baseUrl || 'https://api.openweathermap.org/data/2.5'
    }
  };
};

export const logConfigStatus = () => {
  const validation = validateApiConfig();
  
  if (validation.isValid) {
    console.log('Weather API configuration is valid');
  } else {
    console.error('Weather API configuration errors:');
    validation.errors.forEach(error => console.error(`   • ${error}`));
    console.log('\n Hướng dẫn cấu hình:');
    console.log('   1. Tạo tài khoản tại: https://openweathermap.org/api');
    console.log('   2. Lấy API key từ dashboard');
    console.log('   3. Cập nhật file .env với API key thật');
    console.log('   4. Restart development server');
  }
  
  return validation;
}; 