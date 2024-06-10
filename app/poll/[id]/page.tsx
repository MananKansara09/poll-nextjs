"use client";
import { pollById } from "@/service/poll/index";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useStore } from "@/store";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { addComment, pollresponse } from "@/service/poll/index";
import { toast } from "sonner";

export default function Poll() {
  const user = useStore((state) => state.users);
  const params = useParams();
  const [poll, setPoll] = useState({ question: "", options: [], comments: [] });
  const [newComment, setNewComment] = useState("");

  async function getPollData(id) {
    const res = await pollById(id);
    setPoll(res.data.data);
  }

  async function handleAddComment(pollId: String) {
    const res = await addComment(pollId, { text: newComment });
    if (res.status === 200) {
      toast(res.data.message);
      getPollData(params.id);
      setNewComment('')
    }
  }

  async function handlepoll(pollId, id) {
    const res = await pollresponse(pollId, { optionId: id });
   
    if (res.status === 200) {
    
      toast(res.data.message);
      getPollData(params.id);
      
    }
  }

  useEffect(() => {
    if (params.id) {
      getPollData(params.id);
    }
  }, [params.id]);

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Poll</CardTitle>
        <CardDescription>
          Submit your poll response & add a comment
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CardTitle>{poll.question}</CardTitle>
        <CardDescription>
          {poll.options.map((option, index) => {
            return (
              <Button
                key={index}
                className="mt-2 mr-1"
                variant={
                  option?.responses?.filter((obj) => obj?._id === user?._id) > 0
                    ? "solid"
                    : "outline"
                }
                disabled={
                  option?.responses?.filter((obj) => obj?._id === user?._id)
                    .length > 0
                    ? true
                    : false
                }
                onClick={() => handlepoll(poll._id, option._id)}
              >
                {option.text}
              </Button>
            );
          })}
        </CardDescription>
        <CardDescription className="mt-4">
          <CardTitle>Comments</CardTitle>
          <div className="comments-container h-48 overflow-y-auto">
            {poll.comments.map((comment, index) => {
              return (
                <div key={index} className="mt-2">
                  <div className="font-bold">{comment.user.email}</div>
                  <div>{comment.text}</div>
                  <div className="text-xs text-gray-500">
                    {comment.createdAt.split('T')[0]}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add your comment..."
            />
            <Button className="mt-2" onClick={() => handleAddComment(poll._id)}>
              Submit
            </Button>
          </div>
        </CardDescription>
      </CardContent>
    </Card>
  );
}
