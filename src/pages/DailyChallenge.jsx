import { useEffect, useState } from "react";
import { generateRecommendation } from "../utils/aiRecommendation";
import {
  Trophy,
  Brain,
  Code2,
  MessageSquare,
  Lightbulb,
  Database,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Sparkles,
  Clock3,
  Target,
  Loader2,
  TrendingDown,
  CalendarClock,
  BookOpen,
} from "lucide-react";
import { supabase } from "../lib/supabaseClient";

const categoryConfig = {
  Aptitude: {
    icon: Brain,
    color: "blue",
  },
  Coding: {
    icon: Code2,
    color: "indigo",
  },
  Interview: {
    icon: MessageSquare,
    color: "violet",
  },
  GK: {
    icon: Lightbulb,
    color: "amber",
  },
  "Core CSE": {
    icon: Database,
    color: "emerald",
  },
};

function DailyChallenge() {
  const [student, setStudent] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [tests, setTests] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [performance, setPerformance] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [result, setResult] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    loadChallengeData();
  }, []);

  /* =====================================================
     LOAD ALL EDUAI DATA
  ====================================================== */

  const loadChallengeData = async () => {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }

      /* ---------------------------------------------------
         LOAD STUDENT
      --------------------------------------------------- */

      const { data: studentData, error: studentError } =
        await supabase
          .from("students")
          .select("*")
          .eq("email", user.email)
          .single();

      if (studentError) {
        console.error("Student error:", studentError);
        return;
      }

      setStudent(studentData);

      /* ---------------------------------------------------
         LOAD DATA IN PARALLEL
      --------------------------------------------------- */

      const [
        taskResponse,
        activityResponse,
        performanceResponse,
        testsResponse,
        assignmentsResponse,
      ] = await Promise.all([
        supabase
          .from("learning_tasks")
          .select("*")
          .eq("is_active", true)
          .order("id", { ascending: true }),

        supabase
          .from("student_task_activity")
          .select("task_id")
          .eq("student_id", studentData.id),

        supabase
          .from("student_performance")
          .select("*")
          .eq("student_id", studentData.id),

        supabase
          .from("tests")
          .select("*")
          .order("test_date", { ascending: true }),

        supabase
          .from("assignments")
          .select("*")
          .order("due_date", { ascending: true }),
      ]);

      /* ---------------------------------------------------
         LEARNING TASKS
      --------------------------------------------------- */

      if (taskResponse.error) {
        console.error(
          "Learning task error:",
          taskResponse.error
        );
      }

      const taskData = taskResponse.data || [];

      setTasks(taskData);

      /* ---------------------------------------------------
         COMPLETED TASKS
      --------------------------------------------------- */

      if (activityResponse.error) {
        console.error(
          "Activity error:",
          activityResponse.error
        );
      }

      const activityData = activityResponse.data || [];

      const completedIds = activityData.map(
        (item) => item.task_id
      );

      setCompletedTasks(completedIds);

      /* ---------------------------------------------------
         PERFORMANCE
      --------------------------------------------------- */

      if (performanceResponse.error) {
        console.error(
          "Performance error:",
          performanceResponse.error
        );
      }

      const performanceData =
        performanceResponse.data || [];

      setPerformance(performanceData);

      /* ---------------------------------------------------
         TESTS
      --------------------------------------------------- */

      if (testsResponse.error) {
        console.error(
          "Tests error:",
          testsResponse.error
        );
      }

      const testData = testsResponse.data || [];

      setTests(testData);

      /* ---------------------------------------------------
         ASSIGNMENTS
      --------------------------------------------------- */

      if (assignmentsResponse.error) {
        console.error(
          "Assignments error:",
          assignmentsResponse.error
        );
      }

      const assignmentData =
        assignmentsResponse.data || [];

      setAssignments(assignmentData);

      /* ---------------------------------------------------
         GENERATE PERSONALIZED RECOMMENDATION
      --------------------------------------------------- */

      const generatedRecommendation =
        generateRecommendation({
          performance: performanceData,
          tests: testData,
          assignments: assignmentData,
          tasks: taskData,
          completedTaskIds: completedIds,
        });

      setRecommendation(generatedRecommendation);

      console.log(
        "EduAI Recommendation:",
        generatedRecommendation
      );
    } catch (error) {
      console.error(
        "Daily challenge error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     START TASK
  ====================================================== */

  const startTask = (task) => {
    if (!task) return;

    setSelectedTask(task);
    setSelectedAnswer("");
    setResult(null);
  };

  /* =====================================================
     SUBMIT ANSWER
  ====================================================== */

  const submitAnswer = async () => {
    if (!selectedTask || !selectedAnswer) return;

    try {
      setSubmitting(true);

      const isCorrect =
        selectedAnswer ===
        selectedTask.correct_answer;

      const creditsEarned = isCorrect
        ? selectedTask.credits
        : 0;

      /* -----------------------------------------------
         CHECK DUPLICATE
      ------------------------------------------------ */

      const { data: existingActivity } =
        await supabase
          .from("student_task_activity")
          .select("id")
          .eq("student_id", student.id)
          .eq("task_id", selectedTask.id)
          .maybeSingle();

      if (existingActivity) {
        setResult({
          type: "already",
          message:
            "You have already completed this challenge.",
        });

        setSubmitting(false);
        return;
      }

      /* -----------------------------------------------
         SAVE ACTIVITY
      ------------------------------------------------ */

      const { error: activityError } =
        await supabase
          .from("student_task_activity")
          .insert({
            student_id: student.id,
            task_id: selectedTask.id,
            answer: selectedAnswer,
            is_correct: isCorrect,
            credits_earned: creditsEarned,
          });

      if (activityError) {
        console.error(
          "Activity save error:",
          activityError
        );

        setResult({
          type: "error",
          message:
            "Unable to save your attempt.",
        });

        setSubmitting(false);
        return;
      }

      /* -----------------------------------------------
         UPDATE CREDITS
      ------------------------------------------------ */

      if (creditsEarned > 0) {
        const newCredits =
          Number(student.credits || 0) +
          creditsEarned;

        const { error: creditError } =
          await supabase
            .from("students")
            .update({
              credits: newCredits,
            })
            .eq("id", student.id);

        if (creditError) {
          console.error(
            "Credit update error:",
            creditError
          );
        } else {
          setStudent((previous) => ({
            ...previous,
            credits: newCredits,
          }));
        }
      }

      /* -----------------------------------------------
         UPDATE COMPLETED TASKS
      ------------------------------------------------ */

      setCompletedTasks((previous) => [
        ...previous,
        selectedTask.id,
      ]);

      /* -----------------------------------------------
         UPDATE RECOMMENDATION
      ------------------------------------------------ */

      const updatedCompletedTasks = [
        ...completedTasks,
        selectedTask.id,
      ];

      const updatedRecommendation =
        generateRecommendation({
          performance,
          tests,
          assignments,
          tasks,
          completedTaskIds:
            updatedCompletedTasks,
        });

      setRecommendation(updatedRecommendation);

      /* -----------------------------------------------
         RESULT
      ------------------------------------------------ */

      setResult({
        type: isCorrect
          ? "success"
          : "wrong",

        message: isCorrect
          ? `Excellent! You earned +${creditsEarned} credits.`
          : "Good attempt! Keep practicing and improve your skills.",
      });
    } catch (error) {
      console.error(error);

      setResult({
        type: "error",
        message:
          "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  /* =====================================================
     RECOMMENDATION ICON
  ====================================================== */

  const getRecommendationIcon = () => {
    if (!recommendation) return Sparkles;

    switch (recommendation.type) {
      case "weak-subject":
        return TrendingDown;

      case "upcoming-test":
        return CalendarClock;

      case "assignment":
        return BookOpen;

      case "smart-time":
        return Sparkles;

      default:
        return Sparkles;
    }
  };

  const RecommendationIcon =
    getRecommendationIcon();

  /* =====================================================
     LOADING
  ====================================================== */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="rounded-2xl bg-white px-8 py-7 text-center shadow-xl">
          <Loader2
            className="mx-auto animate-spin text-blue-600"
            size={32}
          />

          <p className="mt-3 text-sm font-medium text-slate-500">
            Analyzing your learning profile...
          </p>
        </div>
      </div>
    );
  }

  /* =====================================================
     RECOMMENDED TASK
  ====================================================== */

  const recommendedTask =
    recommendation?.action &&
    !completedTasks.includes(
      recommendation.action.id
    )
      ? recommendation.action
      : null;

  /* =====================================================
     MAIN
  ====================================================== */

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 md:px-8">

      <div className="mx-auto w-full max-w-6xl">

        {/* =================================================
           HEADER
        ================================================== */}

        <div className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-6 text-white shadow-xl sm:p-8">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div className="min-w-0">

              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-blue-100">
                <Sparkles size={19} />
                EduAI Intelligence
              </div>

              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                Make Your Free Time Count.
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                EduAI analyzes your academic performance,
                upcoming activities and learning progress
                to recommend what you should learn next.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">

                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold">
                  AI Powered
                </span>

                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold">
                  Personalized
                </span>

                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold">
                  Skill Building
                </span>

              </div>
            </div>

            {/* Credits */}

            <div className="w-full shrink-0 rounded-2xl border border-white/20 bg-white/10 px-6 py-5 text-center backdrop-blur-xl md:w-auto">

              <div className="flex items-center justify-center gap-2 text-blue-100">
                <Trophy size={17} />

                <p className="text-sm font-medium">
                  Your Credits
                </p>
              </div>

              <p className="mt-1 text-4xl font-extrabold">
                {student?.credits || 0}
              </p>

              <p className="mt-1 text-xs text-blue-100">
                Keep learning to earn more
              </p>

            </div>

          </div>
        </div>

        {/* =================================================
           AI RECOMMENDATION
        ================================================== */}

        {recommendation && (
          <div className="mb-8 overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-sm">

            <div className="bg-gradient-to-r from-indigo-50 via-white to-blue-50 p-5 sm:p-6">

              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                <div className="flex min-w-0 items-start gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                    <RecommendationIcon size={22} />
                  </div>

                  <div className="min-w-0">

                    <div className="flex flex-wrap items-center gap-2">

                      <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                        EduAI Recommendation
                      </p>

                      {recommendation.priority && (
                        <span
                          className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${
                            recommendation.priority ===
                            "High"
                              ? "bg-red-50 text-red-600"
                              : recommendation.priority ===
                                "Medium"
                              ? "bg-amber-50 text-amber-600"
                              : "bg-emerald-50 text-emerald-600"
                          }`}
                        >
                          {recommendation.priority} Priority
                        </span>
                      )}

                    </div>

                    <h2 className="mt-2 text-lg font-extrabold text-slate-900 sm:text-xl">
                      {recommendation.title}
                    </h2>

                    <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                      {recommendation.message}
                    </p>

                  </div>

                </div>

                {recommendedTask && (
                  <button
                    onClick={() =>
                      startTask(recommendedTask)
                    }
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
                  >
                    Start Recommended Task
                    <ArrowRight size={17} />
                  </button>
                )}

              </div>

              {/* Recommendation details */}

              {recommendation.type ===
                "weak-subject" &&
                performance.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-3 border-t border-indigo-100 pt-4">

                    {[
                      ...performance,
                    ]
                      .sort(
                        (a, b) =>
                          Number(
                            a.average_score
                          ) -
                          Number(
                            b.average_score
                          )
                      )
                      .slice(0, 3)
                      .map((item) => (
                        <div
                          key={item.id}
                          className="rounded-xl border border-slate-200 bg-white px-4 py-3"
                        >
                          <p className="text-xs font-medium text-slate-400">
                            {item.subject}
                          </p>

                          <p className="mt-1 text-sm font-bold text-slate-700">
                            {item.average_score}%
                          </p>
                        </div>
                      ))}

                  </div>
                )}

            </div>
          </div>
        )}

        {/* =================================================
           CHALLENGES
        ================================================== */}

        <div className="mb-5 flex items-end justify-between">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
              Daily Learning
            </p>

            <h2 className="mt-1 text-xl font-extrabold text-slate-900">
              Today's Challenges
            </h2>
          </div>

          <div className="hidden items-center gap-2 text-xs font-medium text-slate-400 sm:flex">
            <Target size={15} />
            Complete challenges to earn credits
          </div>

        </div>

        {/* =================================================
           TASK GRID
        ================================================== */}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          {tasks.map((task) => {

            const config =
              categoryConfig[task.category] ||
              categoryConfig.Aptitude;

            const Icon = config.icon;

            const completed =
              completedTasks.includes(task.id);

            const isRecommended =
              recommendation?.action?.id ===
              task.id;

            return (
              <div
                key={task.id}
                className={`rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
                  isRecommended && !completed
                    ? "border-indigo-300 ring-2 ring-indigo-100"
                    : "border-slate-200"
                }`}
              >

                {/* Recommended label */}

                {isRecommended &&
                  !completed && (
                    <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-600">
                      <Sparkles size={13} />
                      AI Recommended
                    </div>
                  )}

                <div className="flex items-start justify-between gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={24} />
                  </div>

                  <div className="flex flex-wrap justify-end gap-2">

                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                      +{task.credits} Credits
                    </span>

                    {completed && (
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
                        Completed
                      </span>
                    )}

                  </div>

                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  {task.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {task.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-400">

                  <span className="flex items-center gap-1.5">
                    <Clock3 size={14} />
                    {task.estimated_minutes} min
                  </span>

                  <span>
                    {task.difficulty}
                  </span>

                  <span>
                    {task.category}
                  </span>

                </div>

                <button
                  onClick={() =>
                    startTask(task)
                  }
                  disabled={completed}
                  className="mt-5 flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700 disabled:cursor-not-allowed disabled:text-slate-400"
                >
                  {completed
                    ? "Challenge Completed"
                    : "Start Challenge"}

                  <ArrowRight size={17} />
                </button>

              </div>
            );
          })}

        </div>

        {/* =================================================
           EMPTY STATE
        ================================================== */}

        {tasks.length === 0 && (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

            <Brain
              size={40}
              className="mx-auto text-blue-500"
            />

            <h3 className="mt-4 text-lg font-bold text-slate-900">
              No challenges available
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              EduAI will provide new learning activities soon.
            </p>

          </div>
        )}

      </div>

      {/* ===================================================
          CHALLENGE MODAL
      ==================================================== */}

      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm">

          <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl sm:p-8">

            {!result ? (
              <>
                {/* Modal Header */}

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <div className="flex items-center gap-2 text-sm font-semibold text-blue-600">
                      <Brain size={18} />
                      {selectedTask.category}
                    </div>

                    <h2 className="mt-2 text-xl font-extrabold text-slate-900">
                      {selectedTask.title}
                    </h2>

                  </div>

                  <button
                    onClick={() =>
                      setSelectedTask(null)
                    }
                    className="rounded-xl px-3 py-2 text-sm font-bold text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  >
                    ✕
                  </button>

                </div>

                {/* Question */}

                <div className="mt-7 rounded-2xl bg-slate-50 p-5">

                  <p className="text-base font-semibold leading-7 text-slate-900">
                    {selectedTask.question}
                  </p>

                </div>

                {/* Options */}

                <div className="mt-5 space-y-3">

                  {[
                    [
                      "A",
                      selectedTask.option_a,
                    ],
                    [
                      "B",
                      selectedTask.option_b,
                    ],
                    [
                      "C",
                      selectedTask.option_c,
                    ],
                    [
                      "D",
                      selectedTask.option_d,
                    ],
                  ].map(
                    ([letter, option]) => (

                      <button
                        key={letter}
                        onClick={() =>
                          setSelectedAnswer(
                            letter
                          )
                        }
                        className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition ${
                          selectedAnswer ===
                          letter
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50/50"
                        }`}
                      >

                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                            selectedAnswer ===
                            letter
                              ? "bg-blue-600 text-white"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {letter}
                        </span>

                        <span className="text-sm font-medium">
                          {option}
                        </span>

                      </button>

                    )
                  )}

                </div>

                {/* Submit */}

                <button
                  onClick={submitAnswer}
                  disabled={
                    !selectedAnswer ||
                    submitting
                  }
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
                >

                  {submitting ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />
                      Saving...
                    </>
                  ) : (
                    <>
                      Submit Answer
                      <ArrowRight
                        size={17}
                      />
                    </>
                  )}

                </button>
              </>
            ) : (

              /* =================================================
                 RESULT
              ================================================== */

              <div className="py-8 text-center">

                {result.type ===
                "success" ? (
                  <CheckCircle2
                    size={58}
                    className="mx-auto text-emerald-500"
                  />
                ) : result.type ===
                  "wrong" ? (
                  <XCircle
                    size={58}
                    className="mx-auto text-orange-500"
                  />
                ) : (
                  <Brain
                    size={58}
                    className="mx-auto text-blue-500"
                  />
                )}

                <h2 className="mt-5 text-2xl font-extrabold text-slate-900">
                  {result.type ===
                  "success"
                    ? "Great Work!"
                    : result.type ===
                      "wrong"
                    ? "Keep Practicing!"
                    : "Challenge Status"}
                </h2>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                  {result.message}
                </p>

                {result.type ===
                  "success" && (
                  <div className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-600">
                    <Trophy size={17} />
                    +
                    {
                      selectedTask.credits
                    }{" "}
                    Credits
                  </div>
                )}

                <button
                  onClick={() => {
                    setSelectedTask(null);
                    setResult(null);
                    setSelectedAnswer("");
                  }}
                  className="mt-7 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  Continue Learning
                </button>

              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}

export default DailyChallenge;