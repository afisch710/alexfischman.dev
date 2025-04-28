import React from "react";
import Link from "next/link";
import {
    Card,
    CardActionArea,
    CardContent,
    Typography,
    Chip,
    Box,
} from "@mui/material";
import { Experience } from "../../types/experience";

interface ExperienceCardProps {
    experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
    return (
        <Link href={`/experience/${experience.slug}`}>
            <Card
                sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 3,
                    display: "flex",
                    flexDirection: "column",
                    my: 2,
                    boxShadow: 3,
                    overflow: "hidden",
                    backgroundColor: (theme) => theme.palette.background.paper,
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                        transform: "scale(1.02)",
                        boxShadow: 6,
                    },
                    cursor: "pointer",
                }}
            >
                <CardActionArea sx={{ flexGrow: 1 }}>
                    <CardContent
                        sx={{
                            p: 3,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: 'flex-start',
                            height: "100%",
                        }}
                    >
                        <Typography
                            variant="h5"
                            gutterBottom
                            sx={{ fontWeight: "bold" }}
                        >
                            {experience.title}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                            {experience.company} {experience.team && `| ${experience.team}`}
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                            {experience.tags.map((tag, index) => (
                                <Chip
                                    key={index}
                                    label={tag}
                                    size="small"
                                    sx={{ borderRadius: "8px" }}
                                />
                            ))}
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    );
}