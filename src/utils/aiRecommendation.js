// ============================================================
// EDUAI PERSONALIZED RECOMMENDATION ENGINE
// ============================================================

export function generateRecommendation({
  performance = [],
  tests = [],
  assignments = [],
  tasks = [],
  completedTaskIds = [],
}) {
  const now = new Date();

  // ----------------------------------------------------------
  // 1. Find the weakest subject
  // ----------------------------------------------------------

  const weakestSubject =
    performance.length > 0
      ? [...performance].sort(
          (a, b) =>
            Number(a.average_score) - Number(b.average_score)
        )[0]
      : null;

  // ----------------------------------------------------------
  // 2. Find upcoming test
  // ----------------------------------------------------------

  const upcomingTests = tests
    .filter((test) => {
      const testDate = new Date(test.test_date);

      return (
        testDate > now &&
        test.status !== "Completed"
      );
    })
    .sort(
      (a, b) =>
        new Date(a.test_date) -
        new Date(b.test_date)
    );

  const nearestTest = upcomingTests[0] || null;

  // ----------------------------------------------------------
  // 3. Find upcoming assignment
  // ----------------------------------------------------------

  const upcomingAssignments = assignments
    .filter((assignment) => {
      const dueDate = new Date(assignment.due_date);

      return (
        dueDate > now &&
        assignment.status !== "Completed"
      );
    })
    .sort(
      (a, b) =>
        new Date(a.due_date) -
        new Date(b.due_date)
    );

  const nearestAssignment =
    upcomingAssignments[0] || null;

  // ----------------------------------------------------------
  // 4. Find incomplete learning tasks
  // ----------------------------------------------------------

  const availableTasks = tasks.filter(
    (task) =>
      !completedTaskIds.includes(task.id)
  );

  // ----------------------------------------------------------
  // 5. Recommendation priority
  // ----------------------------------------------------------

  // PRIORITY 1:
  // Upcoming test + weak performance

  if (nearestTest && weakestSubject) {
    const subjectMatch =
      nearestTest.subject?.toLowerCase() ===
      weakestSubject.subject?.toLowerCase();

    if (
      subjectMatch &&
      Number(weakestSubject.average_score) < 70
    ) {
      const recommendedTask =
        availableTasks.find((task) =>
          task.title
            ?.toLowerCase()
            .includes(
              weakestSubject.subject?.toLowerCase()
            )
        ) ||
        availableTasks.find(
          (task) =>
            task.category === "Core CSE"
        );

      return {
        type: "weak-subject",
        title: `Focus on ${weakestSubject.subject}`,
        message: `Your current performance in ${weakestSubject.subject} is ${weakestSubject.average_score}%. You also have an upcoming ${nearestTest.subject} test.`,
        action:
          recommendedTask ||
          null,
        priority: "High",
      };
    }
  }

  // ----------------------------------------------------------
  // PRIORITY 2:
  // Upcoming test
  // ----------------------------------------------------------

  if (nearestTest) {
    const recommendedTask =
      availableTasks.find((task) =>
        task.title
          ?.toLowerCase()
          .includes(
            nearestTest.subject?.toLowerCase()
          )
      ) ||
      availableTasks.find(
        (task) =>
          task.category === "Core CSE"
      );

    return {
      type: "upcoming-test",
      title: `Prepare for ${nearestTest.subject}`,
      message: `You have an upcoming ${nearestTest.title}. Use your free time to revise ${nearestTest.subject}.`,
      action:
        recommendedTask ||
        null,
      priority: "High",
    };
  }

  // ----------------------------------------------------------
  // PRIORITY 3:
  // Weak subject
  // ----------------------------------------------------------

  if (
    weakestSubject &&
    Number(weakestSubject.average_score) < 70
  ) {
    const recommendedTask =
      availableTasks.find((task) =>
        task.title
          ?.toLowerCase()
          .includes(
            weakestSubject.subject?.toLowerCase()
          )
      ) ||
      availableTasks.find(
        (task) =>
          task.category === "Core CSE"
      );

    return {
      type: "weak-subject",
      title: `Improve ${weakestSubject.subject}`,
      message: `Your current average in ${weakestSubject.subject} is ${weakestSubject.average_score}%. EduAI recommends additional practice.`,
      action:
        recommendedTask ||
        null,
      priority: "Medium",
    };
  }

  // ----------------------------------------------------------
  // PRIORITY 4:
  // Upcoming assignment
  // ----------------------------------------------------------

  if (nearestAssignment) {
    return {
      type: "assignment",
      title: "Complete Your Assignment",
      message: `You have an upcoming ${nearestAssignment.title} for ${nearestAssignment.subject}.`,
      action:
        availableTasks.find(
          (task) =>
            task.category === "Core CSE"
        ) ||
        availableTasks[0] ||
        null,
      priority: "Medium",
    };
  }

  // ----------------------------------------------------------
  // PRIORITY 5:
  // General productive learning
  // ----------------------------------------------------------

  if (availableTasks.length > 0) {
    const codingTask = availableTasks.find(
      (task) =>
        task.category === "Coding"
    );

    const aptitudeTask = availableTasks.find(
      (task) =>
        task.category === "Aptitude"
    );

    const recommendedTask =
      codingTask ||
      aptitudeTask ||
      availableTasks[0];

    return {
      type: "smart-time",
      title: "Use Your Free Time Productively",
      message:
        "You currently have no urgent academic activity. EduAI recommends a short skill-building challenge.",
      action: recommendedTask,
      priority: "Low",
    };
  }

  // ----------------------------------------------------------
  // No recommendation
  // ----------------------------------------------------------

  return {
    type: "none",
    title: "You're All Caught Up!",
    message:
      "There are currently no new recommendations. Check back later for new learning activities.",
    action: null,
    priority: "Low",
  };
}