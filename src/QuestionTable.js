import React, { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import html2canvas from "html2canvas";
import backgroundImage from "./assets/textured-paper-hd.png"; // Ensure the path to your image is correct

const QuestionTable = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState({ a: "", b: "", c: "", d: "" });
  const randomNumber = Math.floor(Math.random() * 100) + 1;

  const handleGenerateImage = () => {
    const element = document.getElementById("question-table");
    const originalWidth = element.style.width;

    // Temporarily fix the table size for image generation
    element.style.width = "15.5cm";
    element.style.padding = "1cm";

    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");

      const today = new Date();
      const yyyy = today.getFullYear();
      let mm = today.getMonth() + 1; // Months start at 0!
      let dd = today.getDate();

      if (dd < 10) dd = "0" + dd;
      if (mm < 10) mm = "0" + mm;

      const formattedToday = yyyy + mm + dd;

      link.download = formattedToday + ".png";
      link.href = imgData;
      link.click();

      // Restore the responsive size
      element.style.width = originalWidth;
    });
  };

  return (
    // <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>

    <Grid container sx={{ p: 2 }}>
      <Grid item sm={6} xs={12}>
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="button"
            gutterBottom
            style={{ textAlign: "center" }}
          >
            <div style={{ textAlign: "center" }}>
              <b>Enter Question and Options:</b>
            </div>
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ReactQuill
                theme="snow"
                value={question}
                onChange={setQuestion}
                placeholder="Enter Question"
                style={{
                  backgroundColor: "white",
                  borderRadius: "4px",
                  padding: "5px",
                }}
              />
            </Grid>
            {["a", "b", "c", "d"].map((option, index) => (
              <Grid item xs={12} key={index}>
                <ReactQuill
                  theme="snow"
                  value={options[option]}
                  onChange={(value) =>
                    setOptions({ ...options, [option]: value })
                  }
                  placeholder={`Option ${option.toUpperCase()}`}
                  style={{
                    backgroundColor: "white",
                    borderRadius: "4px",
                    padding: "5px",
                  }}
                />
              </Grid>
            ))}
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleGenerateImage}
              >
                Generate Image
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item sm={6} xs={12}>
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="button"
            gutterBottom
            style={{ textAlign: "center" }}
          >
            <div style={{ textAlign: "center" }}>
              <b>Preview of Generated Image:</b>
            </div>
          </Typography>
          <Box
            id="question-table"
            sx={{
              width: { xs: "100%", sm: "75%", md: "16cm" }, // Responsive width for preview
              fontFamily: "Times New Roman",
              fontSize: "24px",
              padding: { xs: "1cm", sm: "1.5cm", md: "2cm" }, // Responsive padding for preview
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              // borderRadius: "8px",
              boxSizing: "border-box",
              margin: "auto",
              marginBottom: 5,
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              transition: "width 0.3s ease", // Smooth transition when resizing
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                tableLayout: "fixed",
              }}
            >
              <tbody>
                <tr>
                  <td
                    style={{
                      width: "1cm",
                      fontWeight: "bold",
                      textAlign: "right",
                      verticalAlign: "top",
                    }}
                  >
                    {randomNumber}.
                  </td>
                  <td
                    style={{
                      textAlign: "justify",
                      verticalAlign: "top",
                      paddingLeft: "0.5cm",
                      paddingBottom: "0.5cm",
                    }}
                  >
                    <div dangerouslySetInnerHTML={{ __html: question }} />
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "1.75cm" }}></td>
                  <td>
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        tableLayout: "fixed",
                      }}
                    >
                      <tbody>
                        {["a", "b", "c", "d"].map((option, index) => (
                          <tr key={index}>
                            <td
                              style={{
                                width: "1cm",
                                fontStyle: "italic",
                                verticalAlign: "top",
                                paddingBottom: "0.25cm",
                                textAlign: "right",
                              }}
                            >
                              ({option})
                            </td>
                            <td
                              style={{
                                textAlign: "left",
                                verticalAlign: "top",
                                paddingLeft: "0.5cm",
                              }}
                            >
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: options[option],
                                }}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </Box>
        </Box>
      </Grid>
    </Grid>

    //   <Divider variant="middle" />
    // </Container>
  );
};

export default QuestionTable;
