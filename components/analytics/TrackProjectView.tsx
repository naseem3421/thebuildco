"use client";

import { useEffect } from "react";
import { trackViewProject } from "@/lib/analytics";

export interface TrackProjectViewProps {
  projectName: string;
  location?: string;
  builtUpArea?: string | number;
}

export function TrackProjectView({ projectName, location, builtUpArea }: TrackProjectViewProps) {
  useEffect(() => {
    trackViewProject({
      project_name: projectName,
      location,
      built_up_area: builtUpArea,
    });
  }, [projectName, location, builtUpArea]);

  return null;
}
