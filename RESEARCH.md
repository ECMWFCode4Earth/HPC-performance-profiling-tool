# HPC profiling tool state of the art

## Metrics

1. Sun Paralel Studio
   1. They use something called Hot packages whic are shown in a pie chart.

   2. Also they are showing all of the prformance problems(a list of how much a functions takes sorted from the most time to the last) any you can go inside in every function on the call trace.

   3. You can also see(the example that they provided in in java) how many objects are alive at some time(also you can see how much memory this objects are takeing up).

   4. Example of profiling hpc with Studio <http://andrei.clubcisco.ro/cursuri/5master/aac-mtphpc/materiale%20curs/Hpc_profiling.pdf>

2. Intel Vtune
   1. Same bar graph as Sun Studio but this time you can see how much each worker has used CPU(CPU time)

   2. You can extend to see what is the problem in each function just as in the Sun Studio

   3. An interesting graph view so that you may see the data dependency for each of the functions; This combined with the cpu time metric will show an interesting picture about where the code problems are(Call Graph Profiling - Critical path shown in red. Selecting in the table (light blue row) selects in the graph (light blue box) and scrolls the view to make the function visible)

   4. Timeseries based view of the code execution; you may see it for different workers/CPUs as well

3. Arm MAP (Previously Allinea MAP)
   1. Distribution of values over all of the processors as a time functions

   2. Source code of the distribution

   3. Number of process in each line as a frequency graph.

   4. You can agregate the value descriebed before and zoom in on them

   5. You get boundary values for each of the agregations.

   6. You can see the different CPU metrics in the same graph form(vetor, memory access, flaotinh point, cpu branch)

   7. The agregation process gives you in the bottom of the screen the posibility to see the code in more detail with metrics for each part line of the code.

   8. You can also anvigate through the code and make the agregation on the line of code that you are interested in.

4. Scalasca
   1. Scalasca is providing an interesting way of seeing data dependencies as an cube(multiple planes)

## Notes

I belive that we can incorporate all of the metrics that I have discovered in the analised programs but we shall concentrate in our implementation on three factors: a way for simbolyzing data dependency better, showing how updates have impacted the metrics and versatility of agredation functions. Maybe even giving the user the posibility to write agregation functions by himself something in the lines of what excel does.
