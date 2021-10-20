About this fork
===================================================
Update code for support Django 3 and Angular 12

Folder description
----------------------------
``angular_dynamic_forms`` - module for Django, you may just copy to you django project dir

``demo/django`` - demo django project

``projects`` - angular module

``src`` - angular demo


Start demo from git source
----------------------------

1. Clone this repo

.. code-block:: bash

    git clone https://github.com/Sherevv/django-angular-dynamic-forms.git

2. Create symlink (or just copy) ``angular_dynamic_forms`` folder to ``demo/django``.

.. code-block:: bash

    cd django-angular-dynamic-forms
    ln -s /path-to/angular_dynamic_forms /path-to/demo/django/angular_dynamic_forms

Replace ``/path-to/`` to yours.

3. Create virtualenv, install Django and django-rest-framework,

.. code-block:: bash

    python3 -m venv env
    source env/bin/activate
    pip install Django
    pip install djangorestframework

4. Apply migrations, fill with demo data, start django server

.. code-block:: bash

    cd demo/django/
    python manage.py migrate
    python manage.py demo_initial_data
    python manage.py runserver 127.0.0.1:8000


5. Go to angular demo dir ``src``, install dependencies and start angular dev server

.. code-block:: bash

    yarn install
    npm run start

6. Open in browser angular page url (http://localhost:4200)


Django Rest Framework meets Angular 6 dynamic forms
===================================================

This repo provides Django mixins and Angular library for rapid
development of create/edit dialogs for django rest framework.
It depends on Django 2, Angular 6 and Material UI.

Note: support for Angular 5 and Django<2 is not actively developed - use
release/angular5 branch or 1.1.* versions of packages if you need that.

On django side, extend your ``Viewset`` to use ``AngularFormMixin``
and optionally configure the mixin by providing either layout
information or field defaults (such as css classes). See demos
for details.

.. code-block:: python

    class CityViewSet(AngularFormMixin, viewsets.ModelViewSet):
        """
        API for cities
        """
        queryset = City.objects.all()
        serializer_class = CitySerializer


On angular side, use ``DjangoFormDialogService`` to display a dialog:

.. code-block:: typescript

    constructor(private dialog: DjangoFormDialogService) {
    }
    createCity() {
        this.dialog.open('/api/1.0/cities/').subscribe(result => {
            console.log('City created, result from server is:', result);
        });
    }

You can also display the form inside your own component via ``<django-inpage-form>`` tag.

.. code-block:: html

    <django-inpage-form django_url="/api/1.0/cities/"
                        (submit)="submit($event)"
                        (cancel)="cancel($event)"></django-inpage-form>



Demo and sample source files
----------------------------

See demos at http://mesemus.no-ip.org:12569

.. image:: https://raw.githubusercontent.com/mesemus/django-angular-dynamic-forms/develop/docs/demo.png

With a bit of work on your side, foreign keys and many-to-many relationships are supported as well (see the demos for details)

.. image:: https://raw.githubusercontent.com/mesemus/django-angular-dynamic-forms/develop/docs/foreign_key.png



Installation
------------

*Django side:*

.. code-block:: bash

    pip install django-angular-dynamic-forms

*Angular side:*

.. code-block:: bash

    npm install --save django-angular-dynamic-forms @ng-dynamic-forms/core @ng-dynamic-forms/ui-material

To render forms, this library uses https://github.com/udos86/ng-dynamic-forms - do not forget
to add it to your package.json.

and add ``DjangoFormModule`` to imports. You will need to provide your own ErrorService for showing
communication errors back to the user. See the ``src/app/mat-error.service.ts`` for
an example implementation.

.. code-block:: typescript

    import {DjangoFormModule, ErrorService} from 'django-angular-dynamic-forms';

    @NgModule({
        declarations: [
            ...
        ],
        imports: [
            BrowserAnimationsModule,
            DynamicFormsCoreModule.forRoot(),
            DynamicFormsMaterialUIModule,
            DjangoFormModule,
            HttpClientModule,
            ...
        ],
        providers: [
            {
                provide: ErrorService,
                useClass: MatErrorService
            },
        ],
        bootstrap: [AppComponent]
    })
    export class AppModule {
    }


Configuration
-------------

If your angular and django server are on the same host/port (see
https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/proxy.md for development tips),
no configuration is necessary.

If angular and django are on different hosts/ports, set django setting ``ANGULAR_FORM_ABSOLUTE_URLS=True`` (
thanks @sssolid for pointing this out).
