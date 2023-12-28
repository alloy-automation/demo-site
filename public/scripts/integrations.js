// Use the token set in window.magicallyToken
const token = window.magicallyToken;

// Set the Alloy token
Alloy.setToken(token);

async function selectIntegration(integrationId) {
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
    try {
        const integrationsData = await Alloy.getIntegrations();
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
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                </div>`;
            integrationOptions.appendChild(option);
        }
    } catch (error) {
        console.error('Error fetching integrations:', error);
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