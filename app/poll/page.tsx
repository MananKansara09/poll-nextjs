"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { pollCreation } from "@/service/poll";

import { toast } from "sonner";

export default function Poll() {
  const [options, setOptions] = useState([{ text: "Option 1", responses: [] }]);
  const [formData, setFormData] = useState({ question: "", options: [] });

  const handleAddOption = () => {
    setOptions([
      ...options,
      { text: `Option ${options.length + 1}`, responses: [] },
    ]);
  };

  const handleRemoveOption = (index:any) => {
    if (options.length > 1) {
      setOptions([...options.slice(0, index), ...options.slice(index + 1)]);
    }
  };

  const handleChangeQuestion = (e:any) => {
    setFormData({ ...formData, question: e.target.value });
  };

  const handleOptionChange = (index:any, value:any) => {
    const newOptions = [...options];
    newOptions[index].text = value;
    setOptions(newOptions);
  };

  const handleSubmit = async () => {
    const pollData = {
      ...formData,
      options: options.map((option) => ({ text: option.text, responses: [] })),
    };
    const data = await pollCreation(pollData);

    setFormData({ question: "", options: [] });
    setOptions([{ text: "Option 1", responses: [] }]);
    toast(data.data.message);
  };

  
  return (
    <Card className="w-full max-w-[850px]">
      <CardHeader>
        <CardTitle>This is your Poll Playground</CardTitle>
        <CardDescription>Deploy your poll in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="question">Question</Label>
            <Input
              id="question"
              placeholder="Write your Question"
              value={formData.question}
              onChange={handleChangeQuestion}
            />
          </div>
          {options.map((option, index) => (
            <div key={index} className="flex flex-col space-y-2">
              <Label htmlFor={`option-${index}`}>{`Option ${index + 1}`}</Label>
              <Input
                id={`option-${index}`}
                placeholder="Write your Option"
                value={option.text}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleRemoveOption(index)}
              >
                Remove Option
              </Button>
            </div>
          ))}
          <Button onClick={handleAddOption}>Add Option</Button>
          <Button className="mt-4" onClick={handleSubmit}>
            Submit Poll
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
