 async function getUser() {
      let username = document.getElementById('username').value.trim();
      if (!username) return alert('Type Your User Name');

      let loader = document.getElementById('loader');
      let result = document.getElementById('result');
      result.innerHTML = '';
      loader.style.display = 'block';

      try {
        let userRes = await fetch(`https://api.github.com/users/${username}`);
        if (!userRes.ok) throw new Error('User not found');
        let user = await userRes.json();

        let repoRes = await fetch(user.repos_url);
        let repos = await repoRes.json();

        loader.style.display = 'none';

        result.innerHTML = `
          <div class="card">
            <div class="avatar">
              <img src="${user.avatar_url}" alt="avatar" />
              <a href="${user.html_url}" target="_blank">View Profile</a>
            </div>
            <div class="details">
              <h1>${user.name || user.login}</h1>
              <p class="bio">${user.bio || 'No bio available'}</p>

              <div class="stats">
                <div class="stat-box">
                  <h3>${user.public_repos}</h3>
                  <p>Repositories</p>
                </div>
                <div class="stat-box">
                  <h3>${user.followers}</h3>
                  <p>Followers</p>
                </div>
                <div class="stat-box">
                  <h3>${user.following}</h3>
                  <p>Following</p>
                </div>
              </div>

              <div class="info">
                <div><strong>Company:</strong> ${user.company || 'N/A'}</div>
                <div><strong>Location:</strong> ${user.location || 'N/A'}</div>
                <div><strong>Email:</strong> ${user.email || 'N/A'}</div>
                <div><strong>Twitter:</strong> ${user.twitter_username || 'N/A'}</div>
                <div><strong>Joined:</strong> ${new Date(user.created_at).toDateString()}</div>
                <div><strong>Last Update:</strong> ${new Date(user.updated_at).toDateString()}</div>
              </div>

              <div class="repos">
                <h1>Latest Repositories</h1>
                <div class="repo-list">
                  ${repos.map(repo => `
                    <div class="repo">
                      <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                      <p> ${repo.stargazers_count} | ${repo.forks_count}</p>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        `;
      } catch (error) {
        loader.style.display = 'none';
        result.innerHTML = `<p style="text-align:center;color:#ffbaba;">${error.message}</p>`;
      }
    }