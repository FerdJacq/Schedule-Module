

<?php $__env->startSection('content'); ?>

    <section>
        <div class="container w-100">
            <div class="login-container">
                    <div class="card">
                        <div class="card-header bg-dark text-white">
                        <h4 class="text-center">Login</h4></div>
                        <div class="card-body">
                            <form>
                                <input type="hidden" name="_token" id="_token" value="<?php echo e(csrf_token()); ?>">
                                <div class="form-group">
                                    <label for="Email">Email</label>
                                    <input type="text" name="email" id="email" class="form-control" placeholder="Enter Username">
                                </div>
                                <div class="form-group">
                                    <label for="password">Password</label>
                                    <input type="password" name="password" id="password" class="form-control" placeholder="Enter Password">
                                </div> 
                                <button type="button" class="btn btn-primary mt-4 w-100" id="login_btn">Login</button>
                            </form>
                        </div>
                    </div>
            </div>
        </div>
        
    </section>
    <script src='js/module/login.js' ></script>
<?php $__env->stopSection(); ?>


<?php echo $__env->make('layouts.master', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\xampp\htdocs\EmployeeSched\resources\views/login.blade.php ENDPATH**/ ?>