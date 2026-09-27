const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

/*
 * ---------------------------------------------------------
 * ADMIN DATA
 * ---------------------------------------------------------
 *
 * Replace these demo arrays with your database later.
 * Never store plain-text passwords here in production.
 */

const super15Students = new Set([
    "26BCC1001"
]);

const motivationalSessions = [
    {
        id: "mot-001",
        title: "Building Confidence & Consistency",
        speaker: "Motivational Speaker",
        startAt: "2026-09-18T12:00:00+05:30",
        endAt: "2026-09-18T13:00:00+05:30",
        roomName: "BCC-MOTIVATIONAL-001"
    }
];

const super15Sessions = [
    {
        id: "super-001",
        title: "Problem Solving & Practice Strategy",
        teacher: "Super 15 Faculty",
        startAt: "2026-09-18T16:00:00+05:30",
        endAt: "2026-09-18T17:00:00+05:30",
        roomName: "BCC-SUPER15-001"
    }
];

/*
 * PTM can later be extended with:
 * - teacher/parent allocation
 * - class targeting
 * - scheduled slots
 * - room IDs
 */

app.use(express.json());

app.get("/api/health", (req, res) => {
    res.json({
        ok: true,
        service: "BCC Learning Center Backend"
    });
});

app.get("/api/super15/access", (req, res) => {
    const studentId = String(req.query.studentId || "");

    res.json({
        isSuper15: super15Students.has(studentId)
    });
});

app.get("/api/super15/sessions", (req, res) => {
    const studentId = String(req.query.studentId || "");

    if (!super15Students.has(studentId)) {
        return res.status(403).json({
            error: "Super 15 access required."
        });
    }

    res.json({
        sessions: super15Sessions
    });
});

app.get("/api/motivational-sessions", (req, res) => {
    const studentId = String(req.query.studentId || "");

    /*
     * Replace this with class-selection / notification logic.
     * Example:
     * session.targetClasses = ["1", "2", "3"] or ["ALL"]
     */

    res.json({
        session: motivationalSessions[0] || null,
        studentId
    });
});

/*
 * ---------------------------------------------------------
 * SUPER 15 REAL-TIME GROUP CHAT
 * ---------------------------------------------------------
 */

const super15History = [];
const MAX_MESSAGES = 100;

const connectedSuper15Users = new Map();

io.on("connection", socket => {

    socket.on("super15:join", payload => {
        const studentId = String(payload?.studentId || "");

        if (!super15Students.has(studentId)) {
            socket.emit("super15:error", {
                message: "Super 15 access required."
            });
            return;
        }

        const user = {
            studentId,
            name: String(payload?.name || "Student")
        };

        socket.data.super15User = user;

        connectedSuper15Users.set(socket.id, user);

        socket.emit("super15:history", super15History);

        io.emit(
            "super15:onlineCount",
            connectedSuper15Users.size
        );
    });

    socket.on("super15:message", payload => {
        const user = socket.data.super15User;

        if (!user) {
            return;
        }

        const text = String(payload?.text || "").trim();

        if (!text || text.length > 500) {
            return;
        }

        const message = {
            studentId: user.studentId,
            name: user.name,
            text,
            timestamp: new Date().toISOString()
        };

        super15History.push(message);

        if (super15History.length > MAX_MESSAGES) {
            super15History.shift();
        }

        io.emit("super15:message", message);
    });

    socket.on("disconnect", () => {
        connectedSuper15Users.delete(socket.id);

        io.emit(
            "super15:onlineCount",
            connectedSuper15Users.size
        );
    });
});

/*
 * Serve the frontend from the parent folder if you want
 * to run the whole project with one Node server.
 */

app.use(express.static(".."));

server.listen(PORT, () => {
    console.log(`BCC backend running on http://localhost:${PORT}`);
});
