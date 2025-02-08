# 1. انتخاب تصویر پایه (Base Image)
FROM node:18

# 2. تنظیم دایرکتوری کاری داخل کانتینر
WORKDIR /app

# 3. کپی فایل‌های موردنیاز و نصب وابستگی‌ها
COPY package.json package-lock.json ./
RUN npm install

# 4. کپی بقیه فایل‌های پروژه
COPY . .

# 5. باز کردن یک پورت برای ارتباط با بیرون
EXPOSE 3000

# 6. فرمان اجرا هنگام شروع کانتینر
CMD ["node", "server.js"]
