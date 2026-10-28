# Jomnouy (M1 frontend prototype)

Vue 3 + TypeScript (strict) + Vite, Vue Router, Pinia. Data comes from a mock API: json-server reading `db.json`.

## How to run it
Two terminals:

    npm install
    npm run api     # terminal 1: json-server on http://localhost:3000
    npm run dev     # terminal 2: the app on http://localhost:5173

(`npm start` runs both in one terminal.)

Checks: `npm run check` (type-check + ESLint) and `npm run build`.

## Routes
| Path | Page | Notes |
|---|---|---|
| `/` | Home feed | category icons, search, loading / error / empty / success |
| `/posts/:id` | Post detail | route parameter, digits only |
| `/posts/new` | Create post | form with validation |
| `/users/:id` | Profile page | anyone can open anyone's profile and see their pinned posts |
| `/profile` | Shortcut | redirects to my own profile |
| `/moderation` | Reported content | moderators only (guard) |
| anything else | 404 page | |

The "View as" switch in the header changes the role. As a Member, typing `/moderation` redirects to `/?denied=1`.

## Folders
- `src/api/` network layer: `http.ts` plus one file per resource (`posts`, `comments`, `reports`, `users`, `pins`)
- `src/stores/` Pinia stores (`posts`, `reports`, `profile`, `session`)
- `src/views/` pages, `src/components/` small reusable pieces
- `docs/` wireframes

## Where is each field validated?
Create post form (`src/views/CreatePostView.vue`): category required, title 3 to 100 characters, content required.
This is client-side only. The server will validate again in weeks 6 and 7.

## State: store or component?
**In Pinia stores:** data from the server that several pages use (posts, current post, comments, reports),
the `loading` and `error` flags, and the session (user and role). They must survive moving between pages.

**In components:** temporary state one screen cares about: what is typed in the form, the selected category icon,
the search box text, and the `submitting` flag. It disappears when the screen closes.

## M1 submission
    git checkout -b m1-frontend
    # work, commit, open a pull request, merge it
    git tag m1
    git push --follow-tags
