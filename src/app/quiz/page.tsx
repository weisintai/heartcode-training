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
import { questions } from "@/lib/constants";

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
