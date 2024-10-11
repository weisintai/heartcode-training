"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { insertQuizResults } from "../server/quiz";
import { useQueryClient } from "@tanstack/react-query";

export const questions = [
  {
    name: "educationHours",
    label: "Education Hours",
    text: "How many hours of drug prevention education have you received in the past year?",
    options: [
      { label: "0-1 hours", value: "1" },
      { label: "2-5 hours", value: "2" },
      { label: "6-10 hours", value: "3" },
      { label: "More than 10 hours", value: "4" },
    ],
  },
  {
    name: "peerPressureConfidence",
    label: "Peer Pressure Confidence",
    text: "How confident are you in your ability to resist peer pressure related to drug use?",
    options: [
      { label: "Not confident", value: "1" },
      { label: "Somewhat confident", value: "2" },
      { label: "Confident", value: "3" },
      { label: "Very confident", value: "4" },
    ],
  },
  {
    name: "trustedAdults",
    label: "Trusted Adults",
    text: "How many trusted adults do you feel comfortable talking to about drug-related issues?",
    options: [
      { label: "None", value: "1" },
      { label: "1-2", value: "2" },
      { label: "3-4", value: "3" },
      { label: "5 or more", value: "4" },
    ],
  },
  {
    name: "campaignMessages",
    label: "Campaign Messages",
    text: "In the past month, how many drug prevention campaign messages have you seen or heard?",
    options: [
      { label: "None", value: "1" },
      { label: "1-3", value: "2" },
      { label: "4-6", value: "3" },
      { label: "7 or more", value: "4" },
    ],
  },
  {
    name: "drugFreeActivities",
    label: "Drug-Free Activities",
    text: "How many drug-free activities or events have you participated in during the last 6 months?",
    options: [
      { label: "None", value: "1" },
      { label: "1-2", value: "2" },
      { label: "3-5", value: "3" },
      { label: "6 or more", value: "4" },
    ],
  },
];

const FormSchema = z.object({
  educationHours: z.string({
    required_error: "Please select an option for education hours",
  }),
  peerPressureConfidence: z.string({
    required_error: "Please select an option for peer pressure confidence",
  }),
  trustedAdults: z.string({
    required_error: "Please select an option for trusted adults",
  }),
  campaignMessages: z.string({
    required_error: "Please select an option for campaign messages",
  }),
  drugFreeActivities: z.string({
    required_error: "Please select an option for drug-free activities",
  }),
});

export default function DrugPreventionSurvey() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      educationHours: "",
      peerPressureConfidence: "",
      trustedAdults: "",
      campaignMessages: "",
      drugFreeActivities: "",
    },
  });

  const queryClient = useQueryClient();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await insertQuizResults(
      parseInt(data.educationHours),
      parseInt(data.peerPressureConfidence),
      parseInt(data.trustedAdults),
      parseInt(data.campaignMessages),
      parseInt(data.drugFreeActivities)
    );

    toast({
      title: "Survey submitted",
      description: "Thank you for completing the survey!",
    });

    // Invalidate and refetch
    await queryClient.invalidateQueries({
      queryKey: ["surveyResults"],
      refetchType: "all",
    });

    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-2xl space-y-6"
      >
        {questions.map((question) => (
          <FormField
            key={question.name}
            control={form.control}
            name={question.name as keyof z.infer<typeof FormSchema>}
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>{question.text}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    {question.options.map((option) => (
                      <FormItem
                        className="flex items-center space-x-3 space-y-0"
                        key={option.value}
                      >
                        <FormControl>
                          <RadioGroupItem value={option.value} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {option.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
