import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Zap, Loader2 } from "lucide-react";
import { useRegisterPlayer } from "@workspace/api-client-react";

export const registrationSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100),
  age: z.coerce.number().min(18, "Must be at least 18").max(24, "Must be under 25"),
  city: z.string().min(2, "City is required").max(100),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(10, "Invalid phone").max(15),
  collegeDomain: z.string().min(2, "Required").max(200),
});

export type RegistrationFormValues = z.infer<typeof registrationSchema>;

type RegistrationFormProps = {
  onSuccess?: (playerNumber: string) => void;
  showStepHeader?: boolean;
  stepLabel?: string;
  headerLabel?: string;
  submitText?: string;
  secureNote?: string;
};

export function RegistrationForm({
  onSuccess,
  showStepHeader = true,
  stepLabel = "STEP 01",
  headerLabel = "IDENTITY REGISTRATION",
  submitText = "ACTIVATE PLAYER IDENTITY",
  secureNote = "SECURE CONNECTION • ENCRYPTED TRANSACTION",
}: RegistrationFormProps) {
  const { mutate, isPending, error } = useRegisterPlayer({
    mutation: {
      onSuccess: (data: { playerNumber: string }) => {
        onSuccess?.(data.playerNumber);
      },
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = (data: RegistrationFormValues) => {
    mutate({ data });
  };

  return (
    <div className="w-full">
      {showStepHeader && (
        <div className="mb-8 flex items-center gap-4 border-b border-white/10 pb-4">
          <span className="text-primary font-mono text-sm font-bold">{stepLabel}</span>
          <span className="text-white/50 font-mono text-sm">{headerLabel}</span>
        </div>
      )}

      {error && (
        <div className="bg-destructive/10 border border-destructive/50 text-destructive p-4 rounded mb-6 text-sm flex items-start gap-3">
          <Zap className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <strong>System Error</strong>
            <p>Registration failed. Please verify your data and retry connection.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Full Name</label>
            <input
              {...register("fullName")}
              className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-white clip-corner-tl"
              placeholder="Enter full name"
            />
            {errors.fullName && <p className="text-destructive text-xs mt-1">{errors.fullName.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Age</label>
            <input
              type="number"
              {...register("age")}
              className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-white clip-corner-tl"
              placeholder="18 - 24"
            />
            {errors.age && <p className="text-destructive text-xs mt-1">{errors.age.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">City</label>
            <input
              {...register("city")}
              className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-white clip-corner-tl"
              placeholder="Enter city"
            />
            {errors.city && <p className="text-destructive text-xs mt-1">{errors.city.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Phone</label>
            <input
              {...register("phone")}
              className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-white clip-corner-tl"
              placeholder="10-digit number"
            />
            {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Email Address</label>
          <input
            type="email"
            {...register("email")}
            className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-white clip-corner-tl"
            placeholder="Enter email address"
          />
          {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">College / Domain</label>
          <input
            {...register("collegeDomain")}
            className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-white clip-corner-tl"
            placeholder="e.g. Engineering, Commerce, Arts, Science"
          />
          {errors.collegeDomain && <p className="text-destructive text-xs mt-1">{errors.collegeDomain.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-primary text-white font-display font-bold tracking-[0.2em] py-5 mt-8 transition-all hover:bg-red-600 hover:neon-box-red clip-corner-all disabled:opacity-50 disabled:pointer-events-none flex justify-center items-center group"
        >
          {isPending ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <span className="flex items-center gap-2">
              {submitText} - ₹200 <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </span>
          )}
        </button>
        <p className="text-center text-xs text-muted-foreground/60 mt-4 font-mono">{secureNote}</p>
      </form>
    </div>
  );
}
