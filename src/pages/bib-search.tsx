import { useState } from "react";
import { Container, Typography, Grid, Box, TextField, Paper, Divider, Alert, Button, InputAdornment, IconButton } from "@mui/material";
import { FaUser, FaPhone, FaExclamationCircle, FaPills, FaMicrophone, FaSearch, FaHeart, FaWaveSquare, FaUtensils, FaNotesMedical } from "react-icons/fa";
import patients from "@/constants/patients.json";

interface Patient {
  id: string;
  name: string;
  age: number;
  contact: string;
  medicalConditions: string[];
  allergies: string[];
}

export default function BibSearchPage() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [bib, setBib] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);

  const handleSearch = () => {
    const foundPatient = patients.find((p) => p.id === bib);
    if (foundPatient) {
      setPatient(foundPatient);
      setError(null);
    } else {
      setPatient(null);
      setError("ไม่พบข้อมูลผู้ป่วย");
    }
  };

  const handleMicrophoneClick = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("เบราว์เซอร์ของคุณไม่รองรับการแปลงเสียงเป็นข้อความ");
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = "th-TH"; // กำหนดภาษาเป็นภาษาไทย
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      setBib(event.results[0][0].transcript); // แปลงเสียงเป็นข้อความและใส่ใน Bib
    };

    recognition.onerror = (event: any) => {
      console.error("เกิดข้อผิดพลาด:", event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <Box sx={{ backgroundColor: "#f0f8ff", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom sx={{ color: "#1976d2", fontWeight: "bold" }}>
          ค้นหาข้อมูลผู้ป่วย
        </Typography>
        <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3, mb: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TextField
              placeholder="กรอกหมายเลข Bib"
              fullWidth
              value={bib}
              onChange={(e) => setBib(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton onClick={handleMicrophoneClick}>
                      <FaMicrophone style={{ color: isListening ? "red" : "#1976d2" }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ backgroundColor: "#fff", borderRadius: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<FaSearch />}
              onClick={handleSearch}
              sx={{
                borderRadius: 2,
                padding: "10px 16px",
                fontSize: "16px",
                textTransform: "none",
              }}
            >
              ค้นหา
            </Button>
          </Box>
        </Paper>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        {patient && (
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3, backgroundColor: "#f9fbff" }}>
            <Typography variant="h5" gutterBottom>
              ข้อมูลผู้ป่วย
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography sx={{ display: "flex", alignItems: "center" }}>
                  <FaUser style={{ marginRight: 8, color: "#1976d2" }} />
                  <b>Bib:</b> {patient.id}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography sx={{ display: "flex", alignItems: "center" }}>
                  <FaUser style={{ marginRight: 8, color: "#1976d2" }} />
                  <b>ชื่อ:</b> {patient.name}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>
                  <b>อายุ:</b> {patient.age}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography sx={{ display: "flex", alignItems: "center" }}>
                  <FaPhone style={{ marginRight: 8, color: "#1976d2" }} />
                  <b>เบอร์ติดต่อ:</b> {patient.contact}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                  <FaExclamationCircle style={{ marginRight: 8, color: "#ff9800" }} />
                  โรคประจำตัว:
                </Typography>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {patient.medicalConditions.map((condition, index) => (
                    <li key={index}>
                      <Typography>{condition}</Typography>
                    </li>
                  ))}
                </ul>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                  <FaPills style={{ marginRight: 8, color: "#f44336" }} />
                  ยาที่แพ้:
                </Typography>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {patient.allergies.map((allergy, index) => (
                    <li key={index}>
                      <Typography>{allergy}</Typography>
                    </li>
                  ))}
                </ul>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
              เพิ่มข้อมูลเพิ่มเติม
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography sx={{ display: "flex", alignItems: "center", color: "#1976d2" }}>
                  <FaUser style={{ marginRight: 8 }} />
                  ชื่อแพทย์
                </Typography>
                <TextField placeholder="กรอกชื่อแพทย์" fullWidth size="small" sx={{ mt: 1 }} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography sx={{ display: "flex", alignItems: "center", color: "#1976d2" }}>
                  <FaHeart style={{ marginRight: 8 }} />
                  อัตราเต้นหัวใจ
                </Typography>
                <TextField placeholder="กรอกอัตราเต้นหัวใจ" fullWidth size="small" sx={{ mt: 1 }} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography sx={{ display: "flex", alignItems: "center", color: "#1976d2" }}>
                  <FaWaveSquare style={{ marginRight: 8 }} />
                  ความดัน
                </Typography>
                <TextField placeholder="กรอกความดัน" fullWidth size="small" sx={{ mt: 1 }} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography sx={{ display: "flex", alignItems: "center", color: "#1976d2" }}>
                  <FaUtensils style={{ marginRight: 8 }} />
                  แพ้อาหาร
                </Typography>
                <TextField placeholder="กรอกข้อมูลแพ้อาหาร" fullWidth size="small" sx={{ mt: 1 }} />
              </Grid>

              <Grid item xs={12}>
                <Typography sx={{ display: "flex", alignItems: "center", color: "#1976d2" }}>
                  <FaNotesMedical style={{ marginRight: 8 }} />
                  อาการ
                </Typography>
                <TextField
                  placeholder="กรอกอาการของผู้ป่วย"
                  multiline
                  rows={4}
                  fullWidth
                  size="small"
                  sx={{ mt: 1 }}
                />
              </Grid>
            </Grid>
          </Paper>
        )}
      </Container>
    </Box>
  );
}
