# Jomnouy

## Problem
People have usable second-hand items and everyday community questions, but lack a localized, non-profit-driven platform to share them. Jomnouy matters because it connects community members to ask questions, offer help, and rent or sell items safely without the overwhelming commercialization of major social media marketplaces.

## Users and roles
Member: Can create, read, update, and delete their own posts and comments, and report bad behavior.
Admin/Mod: Monitors the community feed, reviews reported content, and has the authority to delete inappropriate posts or ban users.

## User stories
1. As a Member, I want to create and browse posts across 4 specific categories (Question, Help, Rent, Sell) so I can interact with the community.
2. As a Member, I want to set up filters to block specific users and topics so that my feed aligns with my preferences and safety boundaries. 
3. As a Member, I want to be able to close or open my "help wanted" posts so that I do not waste anyone's time once my problem is resolved.
4. As a Member, I want to manage my content by editing my original posts and deleting my own comments so I can maintain control over my content.
Accepted when: The system verifies the user is the owner of the post or comment before allowing an edit or deletion.
5. As an Admin, I want to review reported content and delete posts or ban users so that the platform remains safe and aligned with its mission.
Accepted when: An Admin views a post, sees a delete option (which standard Members do not see), and successfully removes it from the database.
6. As a Member, I want to upload a single picture with my post or comment so I can clearly show the item I am renting/selling or the problem I need help with.
7. As a Member, I want to pin my favorite posts to the top of my profile so I can quickly access them later.
8. As a Member, I want to add a location tag to my posts so I can connect with people specifically in my area. 
9. As a Member, I want to auto-translate posts that are not in my native language. 
10. As a Member, I want to see a live chat/typing indicator so I know who is actively online. 
   
Accepted when (for Story 1): A logged-in user can submit a post with a selected category, and it immediately appears on the category feed.
Accepted when (for Story 4): The system verifies the user is the owner of the post or comment before allowing an edit or deletion.
Accepted when (for Story 5): An Admin user views another user's post, sees a delete option (which Members do not see), and can successfully remove it from the database.

## MVP scope
Must have: Story 1, 3, 4, 5, 6, 7
Nice to have: Story 2, 8, 9, 10

## Entities
| Entity | Main attributes | Relations |
|---|---|---|
| User | id, email, password, role, isBanned | has many Posts, Comments, and Reports |
| Post | id, title, content, category, isClosed, isPinned | belongs to User, has many Comments |
| Comment | id, content, imageUrl | belongs to Post, belongs to User |
| Report | id, reason, targetType (post/comment), targetId | belongs to User (reporter) |

## Stretch feature
Search, filter, and pagination (implemented via Infinite Scroll).
What it does in this app: Users can search for specific keywords within the categories. To ensure the application loads quickly, the backend will paginate the database results (e.g., 10 posts per batch). The Vue frontend will implement an endless scrolling UI, automatically fetching the next paginated batch as the user scrolls to the bottom of their feed. (Secondary stretch feature: Single File Upload for images).

Explain: Which story did you cut from the MVP, and why?
I cut the Blocklist filters (Story 2), location tagging (Story 8), auto-translation (Story 9) and live chat (Story 10) from the MVP. Implementing complex multi-table exclusion queries for blocklists creates heavy database loads that distract from the core CRUD requirements. Auto-translation requires external APIs, and live chat requires WebSockets for real-time updates. These introduce significant technical complexity that risks the 14-week timeline, so I am focusing strictly on the core entities and the search/pagination stretch feature.

## Repository
https://github.com/chiv-int/The-Jomnouy-project