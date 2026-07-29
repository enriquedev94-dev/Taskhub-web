"use client"

export function LoginForm() {
    return (
        <form className="space-y-4">
            <div>
                <label>Email</label>

                <input
                    type="email"
                    className="border rounded w-full p-2"
                />
            </div>

            <div>
                <label>Password</label>

                <input
                    type="password"
                    className="border rounded w-full p-2"
                />
            </div>

            <button
                type="submit"
                className="rounded bg-black px-4 py-2 text-white"
            >
                Login
            </button>
        </form>
    );
}