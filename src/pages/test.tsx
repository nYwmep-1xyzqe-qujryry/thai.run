import { useState } from "react";

interface FormData {
  bib: string;
  firstName: string;
  lastName: string;
  age: string;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    bib: "",
    firstName: "",
    lastName: "",
    age: "",
  });

  const [inputText, setInputText] = useState<string>("");

  // ฟังก์ชันแยกข้อความ
  const parseInputText = (text: string) => {
    const parsedData: FormData = {
      bib: "",
      firstName: "",
      lastName: "",
      age: "",
    };

    const words = text.split(" ");

    words.forEach((word, index) => {
      if (word.startsWith("bib")) {
        parsedData.bib = word.replace("bib", "");
      } else if (word === "ชื่อ" || word === "name") {
        parsedData.firstName = words[index + 1] || "";
      } else if (word === "นามสกุล") {
        parsedData.lastName = words[index + 1] || "";
      } else if (word === "อายุ") {
        parsedData.age = words[index + 1] || "";
      }
    });

    setFormData(parsedData);
  };

  // ฟังก์ชันจัดการเมื่อกรอกข้อความในช่อง Input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputText(value);
    parseInputText(value);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>แยกข้อความและเติมฟอร์ม</h1>
      <label htmlFor="inputText">กรอกข้อมูล:</label>
      <input
        type="text"
        id="inputText"
        value={inputText}
        onChange={handleInputChange}
        placeholder="ตัวอย่าง: bib12345 ชื่อ สมพงษ์ นามสกุล ง่วงนอน อายุ 90"
        style={{
          width: "100%",
          padding: "10px",
          margin: "10px 0",
          fontSize: "16px",
        }}
      />

      <h2>ฟอร์มข้อมูลผู้ป่วย</h2>
      <form>
        <label htmlFor="bib">Bib:</label>
        <input
          type="text"
          id="bib"
          value={formData.bib}
          readOnly
          style={{
            width: "100%",
            padding: "10px",
            margin: "10px 0",
            fontSize: "16px",
            backgroundColor: "#f9f9f9",
          }}
        />

        <label htmlFor="firstName">ชื่อ:</label>
        <input
          type="text"
          id="firstName"
          value={formData.firstName}
          readOnly
          style={{
            width: "100%",
            padding: "10px",
            margin: "10px 0",
            fontSize: "16px",
            backgroundColor: "#f9f9f9",
          }}
        />

        <label htmlFor="lastName">นามสกุล:</label>
        <input
          type="text"
          id="lastName"
          value={formData.lastName}
          readOnly
          style={{
            width: "100%",
            padding: "10px",
            margin: "10px 0",
            fontSize: "16px",
            backgroundColor: "#f9f9f9",
          }}
        />

        <label htmlFor="age">อายุ:</label>
        <input
          type="text"
          id="age"
          value={formData.age}
          readOnly
          style={{
            width: "100%",
            padding: "10px",
            margin: "10px 0",
            fontSize: "16px",
            backgroundColor: "#f9f9f9",
          }}
        />
      </form>
    </div>
  );
}
