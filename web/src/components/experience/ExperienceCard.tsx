import React from "react";
import Link from "next/link";
import {
    Card,
    CardActionArea,
    CardContent,
    Typography,
    Box,
} from "@mui/material";
import { Experience } from "../../types/experience";
import TagClamp from "../common/TagClamp";

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
                            {experience.company}
                            {experience.team && experience.team.trim() !== '' && ` | ${experience.team}`}
                        </Typography>
                        <TagClamp tags={experience.tags} maxLines={3} />
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    );
}