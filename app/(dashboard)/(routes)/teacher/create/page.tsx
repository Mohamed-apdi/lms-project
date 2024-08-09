"use client"

import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required and must be at least 1 character long."
    })
})


const CreatePage = () => {
    const router = useRouter();
const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        title: ""
    },
});

const {isSubmitting, isValid } = form.formState;

const onSubmit = async (values: z.infer<typeof formSchema>) => {
    
    try {
        const response = await axios.post("/api/courses", values);
        router.push(`/teacher/courses/${response.data.id}`);
        toast.success("Course created")
    } catch {
        toast.error("Something went wrong")
    }
}

    return ( 
        <div className="max-w-5xl mx-auto md:items-center md:justify-center h-full p-6">
            <div className="">
                <h1 className="text-2xl">Name your course</h1>
                <p className="text-sm text-slate-600">What would you like to name your course? don&apos;t worry you can change latter.</p>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 mt-8"
                    >
                        <FormField
                            name="title"
                            control={form.control}
                            render={({ field}) => (
                                <FormItem >
                                    <FormLabel>
                                        Course title
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'Advanced JavaScript Course'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        What will you tech in this course?
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                             <Link href="/">
                             <Button 
                             variant="ghost"
                             type="button"
                             className="border"
                             >
                                Cancel
                             </Button>
                             </Link>

                             <Button 
                                disabled={!isValid || isSubmitting}
                                type="submit"
                             >
                                Continue
                             </Button>
                        </div> 
                    </form>
                </Form>
            </div>
        </div>
     );
}
 
export default CreatePage;