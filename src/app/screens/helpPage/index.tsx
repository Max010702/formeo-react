import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";

import "../../../css/help.css";
import { faq } from "../../lib/data/faq";
import { terms } from "../../lib/data/terms";

export default function HelpPage() {
  const [value, setValue] = React.useState("1");
  const [expanded, setExpanded] = React.useState<number | false>(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleAccordionChange =
    (index: number) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? index : false);
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <main className="help-page">
      <section className="help-page__header">
        <Container className="help-container">
          <Box className="help-page__eyebrow">Customer care</Box>

          <Box component="h1" className="help-page__title">
            How can we <span>help?</span>
          </Box>

          <Box className="help-page__description">
            Find information about furniture orders, delivery, returns, product
            care, and our customer service.
          </Box>
        </Container>
      </section>

      <Container className="help-container">
        <TabContext value={value}>
          <Box className="help-menu">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="Help page sections"
              className="help-tabs"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab
                value="1"
                icon={<DescriptionOutlinedIcon />}
                iconPosition="start"
                label="Terms"
              />

              <Tab
                value="2"
                icon={<HelpOutlineIcon />}
                iconPosition="start"
                label="FAQ"
              />

              <Tab
                value="3"
                icon={<MailOutlineIcon />}
                iconPosition="start"
                label="Contact"
              />
            </Tabs>
          </Box>

          <Box className="help-main-content">
            <TabPanel value="1">
              <Box className="help-section">
                <Stack className="help-section__heading">
                  <Box>
                    <Box className="help-section__number">01</Box>

                    <Box component="h2" className="help-section__title">
                      Terms and conditions
                    </Box>
                  </Box>

                  <Box className="help-section__introduction">
                    Please review these conditions before placing a furniture
                    order through our website.
                  </Box>
                </Stack>

                <Stack className="terms-list">
                  {terms.map((term, index) => (
                    <Box className="terms-list__item" key={term}>
                      <Box className="terms-list__number">
                        {String(index + 1).padStart(2, "0")}
                      </Box>

                      <Typography component="p">{term}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </TabPanel>

            <TabPanel value="2">
              <Box className="help-section">
                <Stack className="help-section__heading">
                  <Box>
                    <Box className="help-section__number">02</Box>

                    <Box component="h2" className="help-section__title">
                      Frequently asked questions
                    </Box>
                  </Box>

                  <Box className="help-section__introduction">
                    Quick answers about ordering, delivery, materials, returns,
                    and furniture care.
                  </Box>
                </Stack>

                <Stack className="faq-list">
                  {faq.map((item, index) => (
                    <Accordion
                      key={item.question}
                      expanded={expanded === index}
                      onChange={handleAccordionChange(index)}
                      className="faq-item"
                      disableGutters
                      elevation={0}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`faq-panel-${index}`}
                        id={`faq-header-${index}`}
                        className="faq-item__summary"
                      >
                        <Box className="faq-item__number">
                          {String(index + 1).padStart(2, "0")}
                        </Box>

                        <Typography className="faq-item__question">
                          {item.question}
                        </Typography>
                      </AccordionSummary>

                      <AccordionDetails
                        id={`faq-panel-${index}`}
                        className="faq-item__details"
                      >
                        <Typography>{item.answer}</Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Stack>
              </Box>
            </TabPanel>

            <TabPanel value="3">
              <Box className="help-section">
                <Stack className="help-section__heading">
                  <Box>
                    <Box className="help-section__number">03</Box>

                    <Box component="h2" className="help-section__title">
                      Contact our team
                    </Box>
                  </Box>

                  <Box className="help-section__introduction">
                    Send us a message and our customer care team will respond as
                    soon as possible.
                  </Box>
                </Stack>

                <Box className="contact-layout">
                  <Stack className="contact-information">
                    <Box>
                      <Box className="contact-information__eyebrow">
                        Visit our showroom
                      </Box>

                      <Box className="contact-information__title">
                        Let’s create a thoughtful home together.
                      </Box>

                      <Box className="contact-information__description">
                        Our team can help with product details, dimensions,
                        materials, delivery, and styling recommendations.
                      </Box>
                    </Box>

                    <Stack className="contact-information__list">
                      <Stack className="contact-information__item">
                        <LocationOnOutlinedIcon />

                        <Box>
                          <span>Showroom</span>
                          <strong>Downtown, Seoul, South Korea</strong>
                        </Box>
                      </Stack>

                      <Stack className="contact-information__item">
                        <PhoneOutlinedIcon />

                        <Box>
                          <span>Telephone</span>
                          <a href="tel:+8225550198">+82 2 555 0198</a>
                        </Box>
                      </Stack>

                      <Stack className="contact-information__item">
                        <MailOutlineIcon />

                        <Box>
                          <span>Email</span>
                          <a href="mailto:hello@forma.com">hello@forma.com</a>
                        </Box>
                      </Stack>
                    </Stack>
                  </Stack>

                  <form className="contact-form" onSubmit={handleSubmit}>
                    <Box className="contact-form__row">
                      <Box className="contact-form__field">
                        <label htmlFor="contact-name">Your name</label>

                        <input
                          id="contact-name"
                          type="text"
                          name="memberNick"
                          placeholder="Enter your name"
                          autoComplete="name"
                          required
                        />
                      </Box>

                      <Box className="contact-form__field">
                        <label htmlFor="contact-email">Email address</label>

                        <input
                          id="contact-email"
                          type="email"
                          name="memberEmail"
                          placeholder="Enter your email"
                          autoComplete="email"
                          required
                        />
                      </Box>
                    </Box>

                    <Box className="contact-form__field">
                      <label htmlFor="contact-subject">Subject</label>

                      <input
                        id="contact-subject"
                        type="text"
                        name="subject"
                        placeholder="How can we help?"
                        required
                      />
                    </Box>

                    <Box className="contact-form__field">
                      <label htmlFor="contact-message">Message</label>

                      <textarea
                        id="contact-message"
                        name="memberMsg"
                        placeholder="Tell us about your question"
                        rows={7}
                        required
                      />
                    </Box>

                    <Button
                      type="submit"
                      variant="contained"
                      endIcon={<ArrowForwardIcon />}
                      className="contact-form__button"
                    >
                      Send message
                    </Button>
                  </form>
                </Box>
              </Box>
            </TabPanel>
          </Box>
        </TabContext>
      </Container>
    </main>
  );
}
