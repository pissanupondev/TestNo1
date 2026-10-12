# TBWeb

โปรเจกต์ Frontend ที่พัฒนาด้วย **Angular 22.2.0** โดยใช้ Angular CLI สำหรับสร้างและจัดการโปรเจกต์

## ข้อกำหนดเบื้องต้น

ก่อนเริ่มใช้งาน โปรดติดตั้งเครื่องมือต่อไปนี้

* [Node.js](https://nodejs.org/)
* npm (ติดตั้งมาพร้อมกับ Node.js)


Angular	Node.js	TypeScript	RxJS
22.0.x	^22.22.3 || ^24.15.0 || ^26.0.0	>=6.0.0 <6.1.0	^6.5.3 || ^7.4.0

## การติดตั้งโปรเจกต์

ดาวน์โหลดหรือ Clone โปรเจกต์จาก GitHub จากนั้นเปิด Terminal ในโฟลเดอร์โปรเจกต์ แล้วติดตั้ง Dependencies:

 
```bash
npm install
```

## การรันโปรเจกต์ในโหมด Development

เริ่มต้น Development Server ด้วยคำสั่ง:

```bash
ng serve
```

เมื่อ Server เริ่มทำงานแล้ว ให้เปิดเบราว์เซอร์และเข้าใช้งานที่:

http://localhost:4200/

ระบบจะตรวจจับการเปลี่ยนแปลงของไฟล์ Source Code และโหลดแอปพลิเคชันใหม่โดยอัตโนมัติ

## การสร้าง Component และไฟล์ต่าง ๆ

Angular CLI รองรับการสร้าง Component, Directive, Pipe และไฟล์อื่น ๆ ผ่านคำสั่ง CLI

ตัวอย่างการสร้าง Component:

```bash
ng generate component component-name
```

หากต้องการดูคำสั่งและตัวเลือกทั้งหมดที่รองรับ สามารถใช้คำสั่ง:

```bash
ng generate --help
```

## การ Build โปรเจกต์

สร้างไฟล์สำหรับนำไปใช้งานด้วยคำสั่ง:

```bash
ng build
```

ไฟล์ที่ Build สำเร็จจะถูกจัดเก็บไว้ในโฟลเดอร์ `dist/` โดย Angular จะปรับแต่งไฟล์ตามการตั้งค่าของ Build Configuration เพื่อเพิ่มประสิทธิภาพในการทำงาน

## การทดสอบ Unit Test

โปรเจกต์รองรับการทดสอบ Unit Test ผ่าน Vitest สามารถรันทดสอบได้ด้วยคำสั่ง:

```bash
ng test
```

คำสั่งนี้ใช้สำหรับตรวจสอบการทำงานของโค้ดและช่วยลดข้อผิดพลาดระหว่างการพัฒนา

## การทดสอบ End-to-End (E2E)

Angular CLI ไม่ได้ติดตั้ง Framework สำหรับ E2E Testing มาให้โดยอัตโนมัติ สามารถเลือกติดตั้ง Framework ที่เหมาะสมกับโปรเจกต์ได้

คำสั่งสำหรับเรียกใช้งาน E2E Test ขึ้นอยู่กับ Framework ที่ติดตั้งและการตั้งค่าของโปรเจกต์

## แหล่งข้อมูลเพิ่มเติม

* [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)
* [Angular Documentation](https://angular.dev/)
* [Vitest Documentation](https://vitest.dev/)

## หมายเหตุ

* ตรวจสอบเวอร์ชันของ Node.js และ npm ให้ตรงตามข้อกำหนดของ Angular เวอร์ชันที่ใช้งาน
* หลีกเลี่ยงการ Commit ข้อมูลสำคัญ เช่น API Keys, รหัสผ่าน และ Secret ต่าง ๆ ลงใน GitHub
* ตรวจสอบการตั้งค่า API Endpoint ก่อน Build สำหรับนำไปใช้งานจริง
