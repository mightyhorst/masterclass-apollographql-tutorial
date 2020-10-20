`"docker": "masterclass/ubuntu-node",`
What docker file to use to run the cli from 


`"tests": ".playbook/tests",`
Where to find the tests for the playbook (seperate from the tests for the actual code base)

`"docs": ".playbook/docs",`
Docs can be "docs/" or ".playbook/docs"
If ".playbook/docs" then this allows for easier split by steps e.g. 
Convention is `.playbook/docs/{category}/{scene}/{stepId}`

Docs also allows for special meta tags for entire MD or MDX files 
split by 
```hbs
{{#step stepId}}

{{/step}}
```


`"cli": ".playbook/cli",`
Scripts to run each step 
Convention is `.playbook/cli/{category}/{scene}/{stepId}`

`"starterKit": "init commit",`
starter kit can be a seperate repo or look for a commit with the regex "init commit" 


`"ignoreCommits": ["ignore:"]`
Ignore commits allows for commits that can reorganise things or add admin and should be ignored by the playbook 
