import React, { useState } from "react";
import { TextField, Button, Box, IconButton } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

interface BibSearchFormProps {
  onSearch: (bibNumber: string) => void;
}

// ฟังก์ชันสำหรับแปลงตัวเลขภาษาไทยเป็นตัวเลขอารบิก
const convertThaiNumbersToDigits = (text: string): string => {
  const thaiNumberMap: { [key: string]: string } = {
    ศูนย์: "0",
    หนึ่ง: "1",
    สอง: "2",
    สาม: "3",
    สี่: "4",
    ห้า: "5",
    หก: "6",
    เจ็ด: "7",
    แปด: "8",
    เก้า: "9",
  };

  let result = text;
  for (const [thai, digit] of Object.entries(thaiNumberMap)) {
    const regex = new RegExp(thai, "g"); // ค้นหาทุกคำที่ตรงกับคำไทย
    result = result.replace(regex, digit);
  }

  // กรองตัวอักษรที่ไม่ใช่ตัวเลข (กรณีที่มีตัวอักษรเกินมา)
  return result.replace(/[^0-9]/g, "");
};

export default function BibSearchForm({ onSearch }: BibSearchFormProps) {
  const [bibNumber, setBibNumber] = useState("");
  const [isListening, setIsListening] = useState(false);

  const startSpeechToText = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support Speech-to-Text");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "th-TH"; // ภาษาไทย
    recognition.continuous = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript; // ข้อความจากการพูด
      const numericResult = convertThaiNumbersToDigits(transcript); // แปลงคำไทยเป็นตัวเลข
      setBibNumber(numericResult); // กรอกตัวเลขลงในฟอร์ม
      onSearch(numericResult);
    };

    recognition.start();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(bibNumber);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        label="กรอกเลข Bib"
        variant="outlined"
        value={bibNumber}
        onChange={(e) => setBibNumber(e.target.value)}
        fullWidth
        InputProps={{
          endAdornment: (
            <IconButton onClick={startSpeechToText}>
              <MicIcon color={isListening ? "error" : "inherit"} />
            </IconButton>
          ),
        }}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        ค้นหา
      </Button>
    </Box>
  );
}
