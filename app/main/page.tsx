"use client";
import Image from "next/image";
import { useStore } from "@/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

export default function Home() {
  const [poll, setPoll] = useState([]);
  const user = useStore((state) => state);

  async function getPoll() {
    const poll = await user.getAllpoll();
    setPoll(poll);
  }

  useEffect(() => {
    getPoll();
  }, []);

  const handleShare = (pollId: string) => {
    const shareData = {
      title: "Check out this poll",
      text: "I found this interesting poll on our platform. Have a look!",
      url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/poll/${pollId}`,
    };

    try {
      if (navigator.share) {
        navigator
          .share(shareData)
          .then(() => {
            console.log("Poll shared successfully");
          })
          .catch((error) => {
            console.error("Error sharing the poll:", error);
          });
      } else {
        console.log("Web Share API not supported in your browser.");
        // Fallback for browsers that do not support the Web Share API
      }
    } catch (error) {
      console.error("Sharing failed:", error);
    }
  };
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="allPollOfUser">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="allPollOfUser">All Poll of user</TabsTrigger>
            <TabsTrigger value="response">Response of poll</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent className="w-full" value="allPollOfUser">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>No.</TableCell>
                  <TableCell>Polls Question</TableCell>
                  <TableCell>Poll Response</TableCell>
                  <TableCell>Total Comment</TableCell>
                  <TableCell>Sharing a poll</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {poll?.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{data?.question}</TableCell>
                    <TableCell>
                      {data?.options.map((option: any, idx: any) => {
                        let total = option.responses.length;
                        total = total + option.responses.length;
                        return (
                          <>
                            <Badge key={idx} className="m-2 p-2">
                              {option?.text} -{" "}
                              {(option.responses.length * 100) / total}
                            </Badge>
                          </>
                        );
                      })}
                    </TableCell>
                    <TableCell>{data?.comments.length}</TableCell>
                    <TableCell>
                      {" "}
                      <button
                        onClick={() => handleShare(data?._id)}
                        className="bg-blue-500 text-white py-1 px-2 rounded"
                      >
                        Share
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="response"></TabsContent>
      </Tabs>
    </main>
  );
}
