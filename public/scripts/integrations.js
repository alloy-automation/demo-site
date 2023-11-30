const apiKey = sessionStorage.getItem('apiKey');
const userId = sessionStorage.getItem('userId');

document.getElementById('integrationsPage').addEventListener('click', function(event) {
    event.preventDefault();  // Prevent the default link behavior

    const storedApiKey = sessionStorage.getItem('apiKey');
    const storedUserId = sessionStorage.getItem('userId');
    
    if (storedApiKey && storedUserId) {
        window.location.href = `/success?userId=${storedUserId}&apiKey=${storedApiKey}`;
    } else {
        window.location.href = '/';  // or some other default location
    }
});

async function selectIntegration(integrationId) {
    Alloy.setToken(window.magicallyToken);
    Alloy.install({
        integrationId: integrationId,
        callback: () => {
            console.log('Alloy Embedded Modal installed successfully.');
        },
        alwaysShowAuthentication: true,
        hide: false,
        title: 'Cool Alloy Integration'
    });
}

// Fetch the integration data and render the options
(async function () {
    Alloy.setToken(window.magicallyToken);
    integrationsData = await Alloy.getIntegrations();
    const integrationOptions = document.getElementById('integration-options');

    for (const integration of integrationsData.data) {
        const option = document.createElement('div');
        option.classList.add('integration-card');
        option.innerHTML = `
            <div>
                <div class="card-head">
                    <div class="img-wrapper">
                        <img src="${integration.icon}" alt="${integration.app}">
                    </div>
                    <button onclick="selectIntegration('${integration.integrationId}')">Connect</button>
                </div>
                <div class="integration-copy">
                    <h3>${integration.app}</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin commodo, nisi et bibendum venenatis, sapien sapien interdum erat, id bibendum nisl libero vitae justo.</p>
                </div>
            </div>`;
        integrationOptions.appendChild(option);
    }
})();

document.addEventListener('DOMContentLoaded', function () {
    // Initial view
    const integrationContainer = document.getElementById('integration-options');
    integrationContainer.classList.add('list-view');

    // Function to toggle between list and grid views
    window.toggleView = function (view) {
        if (view === 'list') {
            integrationContainer.classList.remove('grid-view');
            integrationContainer.classList.add('list-view');
        } else if (view === 'grid') {
            integrationContainer.classList.remove('list-view');
            integrationContainer.classList.add('grid-view');
        }
    };
});