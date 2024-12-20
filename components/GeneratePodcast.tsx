import { GeneratePodcastProps } from "@/types";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import axios from "axios";
const useGeneratePodcast = ({
  setAudio,
  voiceType,
  voicePrompt,
  setAudioStorageId,
}: GeneratePodcastProps) => {
  const { toast } = useToast();
  const [, setIsGenerating] = useState(false);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const getAudioUrl = useMutation(api.podcasts.getUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);
  const generatePodcast = async () => {
    setIsGenerating(true);
    setAudio("");
    if (!voicePrompt || !voiceType) {
      toast({
        title: "Please provide a voice Prompt to generate a podcast",
      });
      return setIsGenerating(false);
    }
    try {
      const response = await axios.post(
        "/api/audio/generate",
        {
          text: voicePrompt,
          modelUrl: voiceType,
        },
        {
          responseType: "blob",
        }
      );
      const blob = new Blob([response.data], { type: "audio/mpeg" });
      const fileName = `podcast-${uuidv4()}.mp3`;
      const file = new File([blob], fileName, { type: "audio/mpeg" });
      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response).storageId;
      setAudioStorageId(storageId);
      const audioUrl = await getAudioUrl({ storageId });
      setAudio(audioUrl!);
      setIsGenerating(false);
      toast({ title: "Podcast Generated Successfully" });
    } catch (error) {
      console.log(error);
      toast({ title: "Error Creating a podcast", variant: "destructive" });
      setIsGenerating(false);
    }
  };
  return {
    isGenerating: false,
    generatePodcast: generatePodcast,
  };
};
const GeneratePodcast = (props: GeneratePodcastProps) => {
  const { isGenerating, generatePodcast } = useGeneratePodcast(props);
  return (
    <div>
      <div className="flex flex-col gap-2.5">
        <Label className="text-16 font-bold text-white-1">
          AI Prompt to generate Podcast
        </Label>
        <Textarea
          className="input-class font-light focus-visible:ring-offset-orange-1"
          placeholder="Provide text to generate audio"
          rows={5}
          value={props.voicePrompt}
          onChange={(e) => props.setVoicePrompt(e.target.value)}
        />
      </div>
      <div className="mt-5 w-full max-w-[200px]">
        <Button
          type="submit"
          className="text-16  bg-orange-1 py-4 font-bold text-white-1 hover:!bg-orange-600"
          onClick={generatePodcast}
        >
          {isGenerating ? (
            <>
              Generating
              <Loader size={20} className="animate-spin ml-2" />
            </>
          ) : (
            "Generate"
          )}
        </Button>
      </div>
      {props.audio && (
        <audio
          controls
          src={props.audio}
          className="mt-5"
          onLoadedMetadata={(e) =>
            props.setAudioDuration(e.currentTarget.duration)
          }
        />
      )}
    </div>
  );
};

export default GeneratePodcast;
