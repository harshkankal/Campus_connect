'use client';

import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Calendar, MapPin, CheckCircle, Users, Eye, Send, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import type { Event, UserRole, Student, Comment } from '@/lib/types';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { usersAPI } from '@/lib/api/client';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface EventCardProps {
  event: Event;
  role: UserRole;
  onRemove: (eventId: string) => void;
}

function RegisteredStudentsList({ studentIds, children }: { studentIds: string[], children: React.ReactNode }) {
    const [allStudents, setAllStudents] = useState<Student[]>([]);

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {
        try {
            const students = await usersAPI.getStudents();
            setAllStudents(students);
        } catch (e) {
            console.error("Failed to load students", e);
        }
    };

    const registeredStudents = allStudents.filter(student => studentIds.includes(student.id));

    return (
        <Sheet>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Registered Students</SheetTitle>
                    <SheetDescription>
                       {registeredStudents.length > 0 ? `Here are the students registered for this event.` : 'No students have registered yet.'}
                    </SheetDescription>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-8rem)] mt-4">
                    <div className="space-y-4">
                        {registeredStudents.length > 0 ? (
                            registeredStudents.map((student: Student) => (
                                <div key={student.id} className="flex items-center gap-4 p-2 rounded-lg border">
                                    <Avatar>
                                        <AvatarImage src={student.image} />
                                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{student.name}</p>
                                        <p className="text-sm text-muted-foreground">{student.id}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                           <div className="flex flex-col items-center justify-center h-48 text-center">
                                <Users className="h-12 w-12 text-muted-foreground" />
                                <p className="mt-4 text-muted-foreground">No registrations yet.</p>
                           </div>
                        )}
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}

function CommentSheet({ comments, onAddComment, role, children }: { comments: Comment[], onAddComment: (commentText: string) => void, role: UserRole, children: React.ReactNode }) {
    const [newComment, setNewComment] = useState('');

    const handlePostComment = () => {
        if (newComment.trim()) {
            onAddComment(newComment.trim());
            setNewComment('');
        }
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent className="flex flex-col">
                <SheetHeader>
                    <SheetTitle>Comments</SheetTitle>
                    <SheetDescription>
                        Join the conversation about this event.
                    </SheetDescription>
                </SheetHeader>
                <ScrollArea className="flex-grow my-4">
                    <div className="space-y-6 pr-6">
                        {comments.length > 0 ? (
                            comments.map((comment) => (
                                <div key={comment.id} className="flex items-start gap-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={comment.avatarUrl} />
                                        <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className="font-semibold text-sm">{comment.user}</p>
                                            <Badge variant="outline" className="text-xs">{comment.role}</Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{comment.text}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                           <div className="flex flex-col items-center justify-center h-48 text-center">
                                <MessageCircle className="h-12 w-12 text-muted-foreground" />
                                <p className="mt-4 text-muted-foreground">No comments yet.</p>
                                <p className="text-sm text-muted-foreground">Be the first to comment!</p>
                           </div>
                        )}
                    </div>
                </ScrollArea>
                <SheetFooter>
                    <form
                        onSubmit={(e) => { e.preventDefault(); handlePostComment(); }}
                        className="flex w-full items-center space-x-2"
                    >
                        <Input
                            type="text"
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <Button type="submit" size="icon">
                            <Send className="h-4 w-4" />
                            <span className="sr-only">Post Comment</span>
                        </Button>
                    </form>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

export function EventCard({ event, role, onRemove }: EventCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isRsvpd, setIsRsvpd] = useState(false);
  const [comments, setComments] = useState<Comment[]>(event.comments);
  
  const totalStudents = 500;
  const rsvpCount = event.rsvps.length + (isRsvpd ? 1 : 0);

  const eventDate = new Date(event.date);
  const canRegister = role === 'student';
  const canModify = role === 'admin' || role === 'faculty';
  const canViewRegistrations = role === 'faculty' || role === 'admin' || role === 'student';

  const handleAddComment = (commentText: string) => {
    const newComment: Comment = {
        id: `c${Date.now()}`,
        user: 'Current User', // This would be dynamic in a real app
        role: role,
        text: commentText,
        avatarUrl: `https://picsum.photos/seed/${role}/100/100`,
    };
    setComments(prevComments => [...prevComments, newComment]);
  };
  
  const handleRemove = () => {
    onRemove(event.id);
  };

  return (
    <Card className="flex flex-col overflow-hidden rounded-xl shadow-lg transition-transform hover:scale-[1.02]">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={event.image}
            alt={event.title}
            data-ai-hint={event.imageHint}
            fill
            className="object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col p-4">
        <CardTitle className="mb-2 text-lg font-bold">{event.title}</CardTitle>
        <div className="mb-3 flex flex-wrap gap-2">
          {event.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="font-normal">
              {tag}
            </Badge>
          ))}
        </div>
        <p className="mb-4 text-sm text-muted-foreground flex-grow">{event.description}</p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{format(eventDate, 'PPP, p')}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{event.location}</span>
          </div>
           <div className="flex items-center">
            <Users className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{rsvpCount} / {totalStudents} registered</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between bg-muted/30 p-4">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsLiked(!isLiked)} className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-accent">
            <Heart className={cn('h-5 w-5', isLiked && 'fill-accent text-accent')} />
            <span className="text-sm">{event.likes + (isLiked ? 1 : 0)}</span>
          </button>
           <CommentSheet comments={comments} onAddComment={handleAddComment} role={role}>
             <button className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-primary">
                <MessageCircle className="h-5 w-5" />
                <span className="text-sm">{comments.length}</span>
            </button>
           </CommentSheet>
             {canModify && (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                         <button className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-destructive">
                            <Trash2 className="h-5 w-5" />
                        </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the event.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleRemove}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
           )}
        </div>
        <div className="flex items-center gap-2">
            {canRegister && (
            <Button size="sm" onClick={() => setIsRsvpd(!isRsvpd)} variant={isRsvpd ? 'secondary' : 'default'}>
                <CheckCircle className="mr-2 h-4 w-4" />
                {isRsvpd ? 'Registered' : 'Register'}
            </Button>
            )}
            {canViewRegistrations && (
                <RegisteredStudentsList studentIds={event.rsvps}>
                     <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                    </Button>
                </RegisteredStudentsList>
            )}
        </div>
      </CardFooter>
    </Card>
  );
}
