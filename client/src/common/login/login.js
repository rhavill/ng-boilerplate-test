angular.module( 'login', [] )

    .directive( 'loginLink', function() {
        return {
            template: '<a href="#/login"><i class="icon-user"></i>&nbsp;Login</a>'
        };
    })

;