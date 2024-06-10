---
name: QA Data Selectors
about: Use this issue template for QA Data Selectors
title: 'QA Data Selectors'
assignees: []
---
# Add QA Data Selectors

> **Instructions for QA**
>
> <details>
> <summary>
> Please add following data selectors as mentioned for **each page** below. QA test case suite maintainer must verify an issue created before moving it to front end project.
> </summary>
>
> A screen must be present only one time, while creating a task unless absolutely not possible.
>
> General rules for Quality Assurance while creating `data-qa-selector`
>
> 1. All values for data-qa-selector must be in lowercase.
> 2. All words in the values must be separated by `_` only. DO NOT use shortforms.
> 3. Any button, clickable icon button selector must have a postfix as `_button`.
> 4. Any text field selector must have a postfix as `_input`.
> 5. Any link selector must have a postfix as `_link`.
> 6. Any dropdown, date selection must have a postfix as `_selection`.
> 7. Any label selector must have a postfix as `_label`.
> 8. Any checkboxes must have a postfix as `_checkbox`.
> 9. Any radio button must have a postfix as `_radio`.
> 10. Any input errors like input being mandatory or validation error selector must have a postfix as `_error` after the input field selector.
> 11. Do not add the qa-data-selector for table columns on the dashboard, page breadcrumb and page title. The standards are already been defined as below and followed by FE team while development
>     - Table Column - `MicroserviceName_dashboard_table_column_1`, `MicroservicenName_dashboard_table_column_2`, and so on.
>     - Page Title (dashboard) - `MicroservicenName_page_title`.
>     - Page Sub-title (dashboard) - `MicroservicenName_page_subtitle`.
>     - Create Parent breadcrumb - `MicroservicenName_create_breadcrumb`.
>     - Create Page Title - `MicroservicenName_create_new_page_title`.
>     - Edit Parent breadcrumb - `MicroservicenName_edit_breadcrumb`.
>     - Edit Page Title - `MicroservicenName_edit_page_title`.

- [ ] Added generic dashboard empty state screen data selectors added for the module

> Identify the global components such as notificaitons, headers bar navigation, these components must not be assigned selector from an individual module issues.
>
> </details>

## Pages

### Page Name 1

#### Page with indexes

(Please attach a screenshot here with clear numbering added for each interactive element on page and overlays that come up on that page.)

#### Data QA Selectors

Please add a param with key `data-qa-selector` and the value defined in following table.

- [ ] Add following `data-qa-selector` on the screen attached above

| Index | Value for `data-qa-selector` |
| ----- | ---------------------------- |
| 1     | page_title_label             |  
| 2     | page_field_input             |
| 3     | page_action_button           |
| 4     | page_action_link             |
| 5     | page_field_input_error       |

